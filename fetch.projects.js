require('dotenv').config();
const https = require('https');
// const fs = require('fs');

// const file = fs.createWriteStream('pinnedrepo.json');

console.log('### BEGIN ###');

const options = {
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

const request = https.request(
    options,
    function(response) {
        response.setEncoding('utf-8');
        response.on('data', function(data) {
          console.log(data);
        });
        // response.pipe(file);
        // file.on("finish", () => {
        //     file.close();
        //     console.log("Download Completed");
        // });
    }
)

request.on("error", error => {
    console.error("Error: " + error.message);
});

const body = JSON.stringify({
    query: `{
      user(login: "JeremyGillard") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name,
              url
            }
          }
        }
      }
    }`,
  });

request.write(body);
request.end();

console.log('#### END ####');