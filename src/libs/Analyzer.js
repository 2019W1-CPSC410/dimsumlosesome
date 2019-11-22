class Analyzer {

    constructor () {
        this.apiResponse = {"plannedPRs":[],"fastPRs":[]};
    }

    saveApiResponse(pullRequest) {
        let prNumber = Object.keys(pullRequest)[0];

        let dateDifference = Date.parse(pullRequest[prNumber].dateMerged)
            - Date.parse(pullRequest[prNumber].dateCreated);

        if (dateDifference / pullRequest[prNumber].numberOfCommits > 4 * 3600000) {
            this.apiResponse.plannedPRs.push(
                {
                    "timeSpan":dateDifference,
                    "numberOfBugs":pullRequest[prNumber].numberOfBugs
                });
        } else {
            this.apiResponse.fastPRs.push(
                {
                    "timeSpan":dateDifference,
                    "numberOfBugs":pullRequest[prNumber].numberOfBugs
                });
        }
    }

    getDataPoints() {
        return this.apiResponse;
    }
}

export default Analyzer