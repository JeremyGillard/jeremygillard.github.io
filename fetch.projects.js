if (!process.env.GITHUB_WORKFLOW) {
  require('dotenv').config();
}
const https = require('https');
const fs = require('fs');

const PROJECTS_CONTENT_PATH = '/content/projects';
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
  response.setEncoding('utf-8');

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
    // data.foreach(node => repositories.push(node));
    // console.log(data);
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
  
  
    // response.pipe(file);
    // file.on("finish", () => {
    //     file.close();
    //     console.log("Download Completed");
    // });
    // const file = fs.createWriteStream('pinnedrepo.json');