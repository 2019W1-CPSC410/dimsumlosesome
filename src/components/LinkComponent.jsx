import React, { Component } from 'react';
import {
  Button,
  CircularProgress,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Visualization from '../Visualization/Visualization';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '15px 30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    width: '400px',
    margin: '10px',
  },
  button: {
    width: '400px',
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
      loading: false,
      ownerName: '',
      repoName: '',
      quickness: '',
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
    const { ownerName, repoName, quickness } = this.state;
    if (!ownerName || !repoName || !quickness) {
      alert('Please input all fields to proceed');
    }

    this.setState({ loading: true });

    try {
      const response = await axios.get(`http://localhost:3010/analyze?owner=${ownerName}&repo=${repoName}&hours=${quickness}`);
      this.populateGraph(response);
    } catch (error) {
      console.log(error);
    }

    this.setState({ loading: false });
  }

  populateGraph = (response) => {
    this.setState({ graphData: response.data });
  }

  render() {
    const { classes } = this.props;
    const { loading, graphData } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.form}>
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
            label="Repository Name"
          />
          <Tooltip title="The system uses review effort to measure if the code was written quickly. Enter the number of hours to define what is considered as quick.">
            <TextField
              variant="outlined"
              onChange={(e) => this.onChangeTextField('quickness', e)}
              className={classes.textField}
              label="Review Time per Commit"
            />
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.onClickSubmit()}
          >
            ANALYZE REPO
          </Button>
        </div>
        {
          loading
            ? <CircularProgress />
            : <Visualization data={graphData} />
        }
      </div>
    );
  }
}

export default withStyles(styles)(LinkComponent);
