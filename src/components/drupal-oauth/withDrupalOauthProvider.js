import React from 'react';
import DrupalOauthContext from './DrupalOauthContext';

/**
 * HOC to assist in initializing a Drupal OAuth context provider.
 *
 * Creates a new context with the following values:
 * - userAuthenticated: A boolean indicating if the current user is
 *   authenticated.
 * - drupalOauthClient: An instance of the drupalOauth client from
 *   drupalOauthClient.js which can be used to access information about the
 *   current user.
 * - updateAuthenicaticatedUserState: A function that can be called by child
 *   components to update the value of userAuthenticated within the existing
 *   context.
 * 
 * @param {*} client
 *   And instance of the drupalOAuth class from drupalOAuth.js that has already
 *   been initialized.
 * @param {*} Component 
 *   The child component to wrap with the new context provider.
 */
const withDrupalOauthProvider = (client, Component) => {
  class WithDrupalOauthProvider extends React.Component {
    state = {
      userAuthenticated: !!client.isLoggedIn(),
      drupalOauthClient: client,
      updateAuthenticatedUserState: (newState) => {
        this.setState({userAuthenticated: newState});
      },
    };

    render() {
      return (
        <DrupalOauthContext.Provider value={this.state}>
          <Component {...this.props} />
        </DrupalOauthContext.Provider>
      );
    }
  }

  return WithDrupalOauthProvider;
};

export default withDrupalOauthProvider;
