class Analyzer {

    constructor () {
        this.apiResponse = {"plannedPRs":[],"fastPRs":[]};
    }

    saveApiResponse(pullRequest) {

        const dateDifference = pullRequest.dateMerged - pullRequest.dateCreated;

        if (dateDifference / pullRequest.numberOfCommits > 4 * 3600000) {
            this.apiResponse.plannedPRs.push(
                {
                    "timeSpan":dateDifference,
                    "numberOfBugs":pullRequest.numberOfBugs
                });
        } else {
            this.apiResponse.fastPRs.push(
                {
                    "timeSpan":dateDifference,
                    "numberOfBugs":pullRequest.numberOfBugs
                });
        }
    }

    getDataPoints() {
        return this.apiResponse;
    }
}

export default Analyzer