const { DataSetBuilder } = require('../DataPipeline/DataSetBuilder');

class Analyzer {
  constructor(owner, repo) {
    this.owner = owner;
    this.repo = repo;
  }

  async getDataPoints() {
    const prArray = [];

    const dataSetBuilder = new DataSetBuilder(this.owner, this.repo);
    const data = await dataSetBuilder.getFinalData();
    console.log('Analysis completed successfully!');
    data.forEach((prDetails, prKey, map) => {
      const {
        numberOfBugs,
        numberOfCommits,
        merged_at,
        closed_at,
        created_at,
      } = prDetails;
      if (!(numberOfBugs && numberOfCommits && merged_at && closed_at && created_at && numberOfBugs !== -1)) return;
      prArray.push(prDetails);
    });

    if (prArray.length === 0) return [];

    // Sort by created_at in ascending order
    const sortedPRs = prArray.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const dateRepoCreated = sortedPRs[0].created_at;

    const plannedPRs = [];
    const fastPRs = [];

    sortedPRs.forEach(pr => {
      const {
        created_at,
        merged_at,
        numberOfCommits,
        numberOfBugs,
      } = pr;
      const datePRCreated = new Date(created_at).getTime();
      const datePRMerged = new Date(merged_at).getTime();
      const dateDifference = datePRMerged - datePRCreated;
      const classifiedPR = { datePRCreated: created_at, numberOfBugs };

      if (dateDifference / numberOfCommits > 4 * 3600000) {
        plannedPRs.push(classifiedPR);
      } else {
        fastPRs.push(classifiedPR);
      }
    });

    return { dateRepoCreated, plannedPRs, fastPRs };
  }
}

module.exports = { Analyzer };
