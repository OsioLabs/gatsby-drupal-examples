import React from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import { OauthReceiver } from 'react-oauth-flow';

class ReceiveFromDrupal extends React.Component {
  handleSuccess = (accessToken, { response, state }) => {
    this.props.drupalOauthClient.storeToken(response);
    if (this.props.onSuccess) {
      this.props.onSuccess(response, state);
    }
  };

  handleError = error => {
    // @todo: What should we do when this doesn't work?
  };

  // Drupal's Simple Oauth module expects parameters to be be form encoded and
  // in the body of the request. The default fetch function of the OauthReceiver
  // component uses query string arguments. So we provide our own implementation.
  fetchToken = async (url, fetchArgs) => {
    const queryString = qs.parse(url.split('?')[1], { ignoreQueryPrefix: true });

    if (!queryString.code) {
      throw new Error('Can not retrieve authorization token without a code.');
    }

    let formData = new FormData();
    for (var key in queryString) {
      formData.append(key, queryString[key]);
    }

    const response = await fetch(this.props.drupalOauthClient.config.token_url, {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
      }),
      body: formData,
    });

    if (response.ok) {
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      return json;
    }
  }

  render() {
    return (
      <OauthReceiver
        tokenUrl={this.props.drupalOauthClient.config.token_url}
        clientId={this.props.drupalOauthClient.config.client_id}
        clientSecret={this.props.drupalOauthClient.config.client_secret}
        redirectUri={this.props.redirectUri}
        onAuthSuccess={this.handleSuccess}
        onAuthError={this.handleError}
        tokenFn={this.fetchToken}
        render={({ processing, state, error }) => (
          <div data-testid="receiver">
            {processing && <p>Authorizing now...</p>}
            {error && (
              <p className="error">An error occurred: {error.message}</p>
            )}
          </div>
        )}
      />
    );
  }
}

ReceiveFromDrupal.propTypes = {
  drupalOauthClient: PropTypes.object.isRequired,
  redirectUri: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
};

export default ReceiveFromDrupal;
