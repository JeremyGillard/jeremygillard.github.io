if (!process.env.GITHUB_WORKFLOW) {
  require('dotenv').config();
}
const https = require('https');
const fs = require('fs');

const PROJECTS_CONTENT_PATH = './content/projects/';
const repositories = [];

function readmeUrlFromRepositoryUrl(repository) {
  return repository.url.replace('github', 'raw.githubusercontent')
            .concat(`/${repository.defaultBranchRef.name}/README.md`);
}

const getPinnedRepoOptions = {
  hostname: "api.github.com",
  port: 443,
  path: "/graphql",
  method: "POST",
  headers: {
      "Content-Type": "application/json",
      "User-Agent": "JeremyGillard",
      "Authorization": `bearer ${process.env.API_TOKEN}`,
  }
}

function getPinnedRepoCallback(response) {
  let stringData = '';

  response.on('data', function(chunk) {
    stringData += chunk;
  })
  
  response.on('end', () => {
    const body = JSON.parse(stringData);
    const data = body.data.user.pinnedItems.nodes;
    data.forEach(
      repository => repository.readmeUrl = readmeUrlFromRepositoryUrl(repository)
    );
    console.log(data);
    data.forEach(repository => repositories.push(repository));
  });

  response.on('close', () => {
    repositories.forEach(repository => {
      const path = `${PROJECTS_CONTENT_PATH}${repository.name}.md`;
      const file = fs.createWriteStream(path);
      https.get(repository.readmeUrl, (resp) => {
        resp.pipe(file);
        file.on('finish', () => {
          file.close();
        });
      })
    });
  });
}

const getPinnedRepoBody = JSON.stringify({
  query: `{
    user(login: "JeremyGillard") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name,
            url,
            defaultBranchRef {
              name
            }
          }
        }
      }
    }
  }`,
});

https.request(
  getPinnedRepoOptions, 
  getPinnedRepoCallback
  ).end(getPinnedRepoBody);
  