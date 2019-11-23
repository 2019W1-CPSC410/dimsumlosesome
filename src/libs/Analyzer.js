class Analyzer {

    constructor () {
        this.apiResponse = {
            "dateRepoCreated":"",
            "plannedPRs":[],
            "fastPRs":[]
        };
    }

    getDataPoints(obj) {
        this.apiResponse.dateRepoCreated = Object.keys(obj)[0];
        let pullRequests = Object.keys(obj)[1];

        for (const pr of pullRequests) {
            let pullRequestData = Object.keys(pr)[0];
            let datePRCreated = Date.parse(pullRequestData.datePRCreated);

            let dateDifference = Date.parse(pullRequestData.datePRMerged) - datePRCreated;

            if ((dateDifference / pullRequestData.numberOfCommits) > 4 * 3600000) {
                this.apiResponse.plannedPRs.push(
                    {
                        "datePRCreated": datePRCreated,
                        "numberOfBugs": pullRequestData.numberofBugs
                    });
            } else {
                this.apiResponse.fastPRs.push(
                    {
                        "datePRCreated": datePRCreated,
                        "numberOfBugs": pullRequestData.numberofBugs
                    });
            }
        }
        return this.apiResponse;
    }
}

export default Analyzer