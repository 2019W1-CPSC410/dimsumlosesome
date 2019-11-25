import React, { Component } from 'react';
import {
  Button,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Visualization from '../Visualization/Visualization';

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
      ownerName: '',
      repoName: '',
      graphData: {
        dateRepoCreated: '',
        plannedPRs: [],
        fastPRs: [],
      },
    };
  }

  onChangeTextField = (fieldKey, event) => {
    this.setState({ [fieldKey]: event.target.value });
  }

  onClickSubmit = async () => {
    const { ownerName } = this.state;
    const { repoName } = this.state;
    try {
      const response = await axios.post('http://localhost:3010/analyze', {
        owner: ownerName,
        repo: repoName,
      });
      // console.log(response);
      this.populateGraph(response);
    } catch (error) {
      console.log(error);
    }
  }

  populateGraph = (response) => {
    this.setState({ graphData: response.data });
    // console.log('populateGraph');
    // console.log(response.data);
  }

  render() {
    const { classes } = this.props;
    const { graphData } = this.state;

    return (
      <div className={classes.container}>
        <TextField
          variant="outlined"
          onChange={(e) => this.onChangeTextField('ownerName', e)}
          className={classes.textField}
          label="Owner Name"
        />
        <TextField
          variant="outlined"
          onChange={(e) => this.onChangeTextField('repoName', e)}
          className={classes.textField}
          label="Repo Name"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => this.onClickSubmit()}
        >
          ANALYZE REPO
        </Button>
        <Visualization data={graphData} />
      </div>
    );
  }
}

export default withStyles(styles)(LinkComponent);
