import React, { Component } from 'react';
import {
  Button,
  TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

  onClickSubmit = () => {
    // TODO: Call analyze with link
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
