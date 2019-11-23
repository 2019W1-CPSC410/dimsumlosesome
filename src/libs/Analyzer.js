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
            let data = Object.keys(pr)[0];
            let datePRCreated = data.datePRCreated;

            let dateDifference = Date.parse(data.datePRMerged) - Date.parse(datePRCreated);

            if ((dateDifference / data.numberOfCommits) > 4 * 3600000) {
                this.apiResponse.plannedPRs.push(
                    {
                        "datePRCreated": datePRCreated,
                        "numberOfBugs": data.numberofBugs
                    });
            } else {
                this.apiResponse.fastPRs.push(
                    {
                        "datePRCreated": datePRCreated,
                        "numberOfBugs": data.numberofBugs
                    });
            }
        }
        return this.apiResponse;
    }
}

export default Analyzer