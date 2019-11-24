import GitHubClient from "../GitHubAPI/GitHubClient";
import CodeQualityAnalysisTool from '../CodeQuality/CodeQualityAnalysisTool';

class DataSetBuilder {

    constructor(owner, repo) {
        this.client = new GitHubClient(owner, repo);
        this.prData = new Map();
        this.tool = new CodeQualityAnalysisTool();
    }

    getFinalData() {
        return new Promise((resolve, reject) => {
            this.getMetaData().then(async (data) => {
                let finalData = Array.from(data.values()).filter((dataValue) => {return dataValue.raw_urls}).map(async (dataValue) => {
                    console.log('here!!!!!');

                    let prNumber = dataValue.pull_number;
                    let numberOfBugs = 0;
                    const bugsPromises = dataValue.raw_urls.map(async (url) => {
                        const bugs = await this.tool.getBugsFromFile(url);
                        numberOfBugs = numberOfBugs + bugs;
                    });
                    await Promise.all(bugsPromises);
                    console.log('numberOfBugs');
                    console.log(numberOfBugs);
                    this.addToPRData(prNumber, {numberOfBugs: numberOfBugs});
                });

                await Promise.all(finalData);
                resolve(this.prData);

            }).catch((err) => {
                reject(err);
                console.log(err)});
        });

    }

    isJavaScriptFile (fileName) {
        return fileName.split('.').pop() === 'js';
    };

    addToPRData (prNumber, dataObject) {
        let currentEntry = this.prData.get(prNumber);
        if (currentEntry) {
            this.prData.set(prNumber, Object.assign(currentEntry, dataObject))
        } else {
            this.prData.set(prNumber, dataObject)
        }
    };

    getMetaData () {
        return new Promise ((resolve, reject) => {
            let prs = [];
            this.client.getPRForRepo().then(async (result) => {
                await result.map((pr) => {
                    this.prData.set(pr.pull_number, pr);
                    let test = this.client.getFilesForPr(pr.pull_number);
                    prs.push(test);
                });
                this.buildPRData(prs).then((result) => {
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

    buildPRData (prs) {
        return new Promise ((resolve, reject) => {

            Promise.all(prs).then(async (values) => {
                let promiseArr = [];

                await values.map(async (file) => {

                        let prNumber = null;
                        let rawUrls = [];
                        file.map((value) => {
                            if (this.isJavaScriptFile(value.raw_url)) {
                                prNumber = value.pull_number;
                                rawUrls.push(value.raw_url);
                            }
                        });
                        if (prNumber && rawUrls.length > 0) {
                            this.addToPRData(prNumber, {raw_urls: rawUrls});
                            promiseArr.push(this.client.getNumberOfCommitsForPR(prNumber));
                        }
                    }
                );

                Promise.all(promiseArr).then((values) => {
                    values.map((value) => {
                        this.addToPRData(value.pull_number, {numberOfCommits: value.numberOfCommits});
                    });
                    resolve(this.prData);
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
}

export default DataSetBuilder;
