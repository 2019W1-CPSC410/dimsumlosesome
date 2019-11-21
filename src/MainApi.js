import GitHubClient from "./GitHubAPI/GitHubClient";

const owner = "uber";
const repo = "react-map-gl";

// create client for repo and owner
let client = new GitHubClient(owner, repo);

let prs = [];

// get all pull request for a given repo
let response = client.getPRForRepo();

// when request for prs in a repo returns, get the files for each pull request
// based on the pull request number
response.then((result) => {
    result.map((pr) => {
        console.log('pushing to prs');
        prs.push(client.getFilesForPr(pr.number))
    })}).catch((error) => {
    console.log('failed here!!');
});

let files = [];
// using raw_urls of files in pull requests
// get the string representation of the files
Promise.all(prs).then((values) => {
    console.log('first promise.all');
    values.map((file) => {
        files.push(client.getFileString(file.raw_url));
        }
    )
});

// print the file strings -> could possibly run routine that:
//    1. checks if file is javascript file
//    2. if so saves it as javascript file in given directory
//    3. runs linter on file and counts bug
//    4. repeat for all files!!
//    5. pipeline data for analysis (could be a lot of data, want to focus on small repos)
Promise.all(files).then((fileStrings) => {
    console.log('second promise.all');

    fileStrings.map((fileString) => { console.log(fileString)})
});





