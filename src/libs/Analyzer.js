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
        let pullRequests = obj.pullRequests;

        for (let pr of pullRequests) {
            let prNumber = Object.keys(pr)[0];
            let datePRCreated = pr[prNumber].datePRCreated;

            let dateDifference = Date.parse(pr[prNumber].datePRMerged) - Date.parse(pr[prNumber].datePRCreated);

            if ((dateDifference / pr[prNumber].numberOfCommits) > 4 * 3600000) {
                this.apiResponse.plannedPRs.push(
                    {
                        "datePRCreated": datePRCreated,
                        "numberOfBugs": pr[prNumber].numberOfBugs
                    });
            } else {
                this.apiResponse.fastPRs.push(
                    {
                        "datePRCreated": datePRCreated,
                        "numberOfBugs": pr[prNumber].numberOfBugs
                    });
            }
        }
        return this.apiResponse;
    }
}

export default Analyzer