import React, { Component } from 'react';
import {
  Button,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Linter } from 'eslint/lib/linter/index';
import { SourceCode } from 'eslint/lib/source-code/index';
import { parseForESLint } from 'babel-eslint/lib/index';
import CodeQualityAnalysisTool from '../CodeQuality/CodeQualityAnalysisTool';

const linter = new Linter();
linter.defineParser('babel-eslint', {
  parseForESLint,
});
const tool = new CodeQualityAnalysisTool();

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textField: {
    width: '400px',
    margin: '10px',
  },
  button: {
    boxShadow: 'none',
    color: '#ffffff',
    fontWeight: 'bold',
    padding: '14px',
    margin: '5px',
  },
};

class LinkComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: '',
    };
  }

  onChangeTextField = (fieldKey, event) => {
    this.setState({ [fieldKey]: event.target.value });
  }

  onClickSubmit = async () => {
    const { link } = this.state;
    // TODO: Call analyze with link
    try {
      const file = await tool.getFile(link);
      const lines = SourceCode.splitLines(file);
      const messages = lines.map(line => linter.verify(
        line,
        {
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
          rules: {
            semi: 2,
            quotes: ["error", "single"],
          },
        },
      ));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <TextField
          variant="outlined"
          onChange={e => this.onChangeTextField('link', e)}
          className={classes.textField}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => this.onClickSubmit()}
        >
          ANALYZE
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(LinkComponent);
