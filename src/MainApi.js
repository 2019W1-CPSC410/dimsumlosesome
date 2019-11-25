import GitHubClient from "./GitHubAPI/GitHubClient";
import DataSetBuilder from "./DataPipeline/DataSetBuilder"

const owner = "uber";
const repo = "react-map-gl";

var prData = new Map();

// create client for repo and owner
let client = new GitHubClient(owner, repo);

// Checks if file is JavasScript or React JSX file by the file extension
const isSupportedFile = (fileName) => {
    const fileExtension = fileName.split('.').pop();
    return fileExtension === 'js' || fileExtension === 'jsx';
};

// using raw_urls of files in pull requests
// get the string representation of the files
const returnAllFileStrings = function (prs) {
    return new Promise ((resolve, reject) => {

        Promise.all(prs).then(async (values) => {
            let promiseArr = [];
            await values.map(async function(file) {
                    let prNumber = null;
                    let rawUrls = [];
                    file.map((value) => {
                        if (isSupportedFile(value.raw_url)) {
                            prNumber = value.pull_number;
                            rawUrls.push(value.raw_url);
                        }
                    });
                    if (prNumber && rawUrls.length > 0) {
                        addToPRData(prNumber, {raw_urls: rawUrls});
                        promiseArr.push(client.getNumberOfCommitsForPR(prNumber));
                    }
                }
            );

            Promise.all(promiseArr).then((values) => {
                values.map((value) => {
                    addToPRData(value.pull_number, {numberOfCommits: value.numberOfCommits});
                });
                resolve(prData);
            }).catch((err) => {
                console.log(err);
                reject(err)
            })

        }).catch((err) => {
            console.log(er);
            console.log("Error: returnAllFileStrings()");
            reject(err)
        });

    });
};

const addToPRData = function (prNumber, dataObject) {
    let currentEntry = prData.get(prNumber);
    if (currentEntry) {
        prData.set(prNumber, Object.assign(currentEntry, dataObject))
    } else {
        prData.set(prNumber, dataObject)
    }
};

// get all pull request for a given repo
let response = client.getPRForRepo();

// when request for prs in a repo returns, get the files for each pull request
// based on the pull request number
const getResult = function () {
    return new Promise ((resolve, reject) => {
        let prs = [];
        response.then(async (result) => {
            await result.map((pr) => {
                prData.set(pr.pull_number, pr);
                let test = client.getFilesForPr(pr.pull_number);
                prs.push(test);
            });
            returnAllFileStrings(prs).then((result) => {
                resolve(result);
            }).catch((err) => {
                console.log(err)
            })


        }).catch((error) => {
            console.log(err);
            reject(error);
        });
    })

};

// let yay = getResult().then((data) => {
//     console.log(data);
//     console.log('finished!!!!')
// }).catch((err) => {console.log(err)});

let dataSetBuilder = new DataSetBuilder(owner, repo);

dataSetBuilder.getResult().then((data) => {
    console.log(data);
    console.log('finished!!!!')
}).catch((err) => {console.log(err)});









