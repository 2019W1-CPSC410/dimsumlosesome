import React, { Component } from 'react';
import {
  Button,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
      const response = await axios.get('http://localhost:3010/');
      console.log(response);
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
          ANALYZE REPO
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(LinkComponent);
