import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import withDrupalOauthConsumer from '../drupal-oauth/withDrupalOauthConsumer';

class Profile extends React.Component {
  state = {
    profile: false,
  }

  async componentDidMount() {
    // If we've gotten here we can assume the user is logged in since this
    // component is only ever used for authenticated users. Grab the token we
    // need to make requests to Drupal.
    const token = this.props.drupalOauthClient.isLoggedIn();

    const headers = new Headers({
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `${token.token_type} ${token.access_token}`
    });

    const options = {
      method: 'GET',
      headers,
    };

    let userInfo, userData;

    // Use this endpoint to figure out the ID of the current user.
    try {
      let response = await fetch(`http://gatsby-drupal.ddev.local/oauth/debug`, options);
      userInfo = await response.json();
    } catch(err) {
      console.log(`There was an error accessing oauth/debug: ${err}`)
    }

    if (userInfo.id) {
      try {
        let response = await fetch(`http://gatsby-drupal.ddev.local/jsonapi/user/user?filter[uid][value]=${userInfo.id}`, options);
        userData = await response.json();
      } catch(err) {
        console.log(`There was an error retrieving the user's profile data: ${err}`)
      }
    }

    const profile = userData.data.shift().attributes;

    if (profile.uid === userInfo.id) {
      this.setState({profile: profile});
    }
  }

  render() {
    if (!this.state.profile) {
      return (
        <LinearProgress />
      )
    }
    return(
      <>
      <Typography variant="h2" paragraph>Hi {this.state.profile.name}, this is your profile</Typography>
      <ul>
        {
          Object.keys(this.state.profile).map(key => <li key={key}>{key}: {this.state.profile[key]}</li>)
        }
      </ul>
      </>
    );
  }
}

export default withDrupalOauthConsumer(Profile);
