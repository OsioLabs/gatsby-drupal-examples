import React from 'react';
import withDrupalOauthConsumer from './withDrupalOauthConsumer';

class LoginForm extends React.Component {
  state = {
    processing: false,
    username: '',
    password: '',
    error: null,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ processing: true });
    const { username, password } = this.state;

    try {
      await this.props.drupalOauthClient.handleLogin(username, password, '');
      this.setState({ processing: false });
      this.props.updateAuthenticatedUserState(true);
    } catch(err) {
      this.setState({
        processing: false,
        error: 'Unable to complete your login request.',
      });
    }
  };

  render() {
    const { error, processing } = this.state;

    return (
      <>
        { error &&
          <div>{error}</div>
        }
        <div>
          Enter your username and password below to log in.
        </div>
        { processing ?
          <div>Loading ...</div>
          :
          <form onSubmit={ event => this.handleSubmit(event)}>
            <label>
            Username:
            <input
              type="text"
              name="username"
              onChange={event =>
                this.setState({ [event.target.name]: event.target.value })
              }
            />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }
              />
            </label>
            <input type="submit" value="Log in" onClick={ event => this.handleSubmit(event)} />
          </form>
        }
      </>
    );
  }
}

export default withDrupalOauthConsumer(LoginForm);
