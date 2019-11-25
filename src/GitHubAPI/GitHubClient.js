const axios = require('axios');
const { CLIENT_ID } = require('../constants');
const { CLIENT_SECRET } = require('../constants');

const baseUrl = "https://api.github.com/repos/";

let headers = {
    headers: {
        'User-Agent': 'patrickdhopkins',
    }
};

class GitHubClient {

    // takes an owner and a repo, see github url to repo for details
    constructor(owner, repo) {
        this.owner = owner;
        this.repo = repo;
    }

    getBaseUrl() {
        return baseUrl + `${this.owner}/${this.repo}/`;
    }

    getAuthParameters() {
        return `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    }

    // Gets all pull request for given repo
    async getPRForRepo(state="closed") {
        try {
            const response = await axios.get(this.getBaseUrl() + `pulls${this.getAuthParameters()}&state=${state}`, headers);
            let data = response.data;
            data = data.map((pr) => {
                return {"created_at": pr.created_at,
                    "updated_at": pr.updated_at,
                    "closed_at": pr.closed_at,
                    "merged_at": pr.merged_at,
                    "merge_commit_sha": pr.merge_commit_sha,
                    "pull_number": pr.number}
            });
            return data;
        } catch (error) {
            console.log(error);
            console.log("getPRForRepo")
        }
    };

    // gets the files for a given pull request
    async getFilesForPr(pull_number) {
        if (!pull_number) {
            return;
        }
        try {
            const response = await axios.get(this.getBaseUrl() + `pulls/${pull_number}/files${this.getAuthParameters()}`, headers);
            let data = response.data;
            data = data.map((file) => {
                return {
                    "raw_url": file.raw_url,
                    "additions": file.additions,
                    "deletions": file.deletions,
                    "changes": file.changes,
                    "pull_number": pull_number
                    }
            });
            return data;
        } catch (error) {
            console.log(error);
            console.log("Error: getFilesForPr()")
        }
    }

    // for a given file gets a string representation of that file using the 'raw url'
    // could potentially save save this file in its correct format (e.g. javascript)
    // and run linter on files 1 by 1
    async getFileString(currFile) {
        try {
            const response = await axios.get(currFile.raw_url, headers);
            let data = response.data;
            return {
                'string_file': data,
                'pull_number': currFile.pull_number
            };
        } catch (error) {
            console.log(error);
            console.log("Error: getFileString()")

        }
    }

    async getNumberOfCommitsForPR(pull_number) {
        if (!pull_number) {
            console.log('NO PR NUMBR!!');
            return;
        }
        try {
            const response = await axios.get(this.getBaseUrl() + `pulls/${pull_number}/commits${this.getAuthParameters()}`, headers);
            let data = response.data;
            return {numberOfCommits: data.length,
                pull_number: pull_number}
        } catch (error) {
            console.log(error);
            console.log("Error: getFilesForPr()")
        }
    }
}

module.exports = { GitHubClient };
