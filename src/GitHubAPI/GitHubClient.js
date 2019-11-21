import axios from "axios";

const baseUrl = "https://api.github.com/repos/";

let headers = {
    headers: {
        'User-Agent': 'request'
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

    // Gets all pull request for given repo
    async getPRForRepo(state="all") {
        try {
            const response = await axios.get(this.getBaseUrl() + `pulls?state=${state}`, headers);
            let data = response.data;
            data = data.map((pr) => {
                return {"created_at": pr.created_at,
                    "updated_at": pr.updated_at,
                    "closed_at": pr.closed_at,
                    "merged_at": pr.merged_at,
                    "merge_commit_sha": pr.merge_commit_sha,
                    "number": pr.number}
            });
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    // gets the files for a given pull request
    async getFilesForPr(pull_number) {
        if (!pull_number) {
            return;
        }
        try {
            const response = await axios.get(this.getBaseUrl() + `pulls/${pull_number}/files`, headers);
            let data = response.data;
            data = data.map((file) => {
                return {
                    "raw_url": file.raw_url,
                    "additions": file.additions,
                    "deletions": file.deletions,
                    "changes": file.changes
                    }
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    // for a given file gets a string representation of that file using the 'raw url'
    // could potentially save save this file in its correct format (e.g. javascript)
    // and run linter on files 1 by 1
    async getFileString(raw_url) {
        try {
            const response = await axios.get(raw_url, headers);
            let data = response.data;
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getCommitsForPR(prId) {}

    async getFileForCommit(commitId) {}

}

export default GitHubClient;