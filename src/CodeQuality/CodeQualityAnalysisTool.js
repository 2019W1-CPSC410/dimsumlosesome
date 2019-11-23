import axios from 'axios';

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
    'jsx',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
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
      const report = cli.executeOnText(file);
      // results is an array (length is always equal to 1) containing all the warning/error messages
      if (!report || !report.results || !report.results[0]) {
        return -1;
      }
      return report.results[0].messages.length;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CodeQualityAnalysisTool;
