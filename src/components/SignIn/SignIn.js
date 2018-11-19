import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import withDrupalOauthConsumer from '../drupal-oauth/withDrupalOauthConsumer';

class SignInForm extends React.Component {
  state = {
    open: false,
    processing: false,
    username: '',
    password: '',
    error: null,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.setState({ processing: true });
    const { username, password } = this.state;

    this.props.drupalOauthClient.handleLogin(username, password, '').then(() => {
      this.setState({ open: false, processing: false });
      this.props.updateAuthenticatedUserState(true)
    });    
  };

  render() {
    const { error, processing } = this.state;

    return (
      <>
        <Button onClick={this.handleClickOpen} variant="contained" color="primary">Log in</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Log in</DialogTitle>
          <DialogContent>
            {error && <p>{error.message}</p>}
            <DialogContentText>
              Enter your username and password below to log in.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="username"
              label="Username"
              type="text"
              fullWidth
              onChange={event =>
                this.setState({ [event.target.name]: event.target.value })
              }
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              onChange={event =>
                this.setState({ [event.target.name]: event.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
              <Button onClick={this.handleCancel} color="default">
                Cancel
              </Button>
              {
                processing ?
                  <CircularProgress />
                  :
                  <Button onClick={this.handleSubmit} color="primary" variant="contained">
                    Log in
                  </Button>
              }
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withDrupalOauthConsumer(SignInForm);
