const axios = require('axios');

const CLIEngine = require('eslint').CLIEngine;

const cli = new CLIEngine({
  basicConfig: {
    extends: 'airbnb',
  },
  envs: [
    'browser',
    'es6',
    'node',
  ],
  extensions: [
    'js',
    'jsx',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      js: true,
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  useEslintrc: true,
  rules: {
    'import/no-unresolved': [
      2,
      { ignore: ['.png$', '.webp$', '.jpg$'] }
    ],
  },
});

class CodeQualityAnalysisTool {
  constructor() {

  }

  // gets the file from a raw github url
  async getFile(url) {
    if (!url) {
      return;
    }
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getBugsFromFile(url) {
    try {
      const file = await this.getFile(url);

      if (!file) {
        return -1;
      }

      const report = cli.executeOnText(file);

      // results is an array (length is always equal to 1) containing all the warning/error messages
      if (
        !report
        || !report.results
        || !report.results[0]
        || !report.results[0].messages
        || Number.isNaN(report.results[0].messages.length)
      ) {
        return -1;
      }

      return report.results[0].messages.length;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { CodeQualityAnalysisTool };
