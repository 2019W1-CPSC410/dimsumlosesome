import axios from 'axios';

const SourceCode = require('eslint').SourceCode;
const Linter = require('eslint').Linter;
const parseForESLint = require('babel-eslint').parseForESLint;
const CLIEngine = require('eslint').CLIEngine;

// Linter configurations
const linter = new Linter();
linter.defineParser('babel-eslint', { parseForESLint });
const verifyConfig = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: true,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
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
  useEslintrc: false,
};

const cli = new CLIEngine({
  baseConfig: {
    "parser": "babel-eslint",
    "env": {
      "browser": true,
      "es6": true,
      "node": true
    },
    "extends": "airbnb",
    "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "plugins": [
      "react"
    ],
    "rules": {
      "import/no-unresolved": [
        "error",
        {
          "ignore": [
            "^meteor/",
            "^/"
          ]
        }
      ]
    }
  },
  envs: ["browser", "mocha"],
  useEslintrc: false,
  rules: {
    semi: 2
  }
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
      const lines = SourceCode.splitLines(file);
      const messages = lines.map((line, index) => {
        const lineNumber = index + 1;
        const errors = linter.verify(line, verifyConfig);
        console.log(lineNumber, errors);
        return ({
          lineNumber,
          errors,
        });
      });
      // const report = cli.executeOnFiles([code]);
      // console.log('Report: ', report);
    } catch (error) {
      console.log(error);
    }
  }
}

export default CodeQualityAnalysisTool;