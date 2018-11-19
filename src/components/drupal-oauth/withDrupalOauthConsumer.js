import React from 'react';
import DrupalOauthContext from './DrupalOauthContext';

/**
 * HOC to wrap a child component with the Drupal OAuth context consumer.
 *
 * Use this to wrap components that need access to the user's current
 * authentication state. The child component will receive the following
 * additional props:
 * - userAuthenticated: A boolean indicating if the current user is
 *   authenticated.
 * - drupalOauthClient: An instance of the drupalOauth client from
 *   drupalOauthClient.js which can be used to access information about the
 *   current user.
 * - updateAuthenicaticatedUserState: A function that can be called by child
 *   components to update the value of userAuthenticated within the existing
 *   context.
 *
 * @param {*} Component
 *   The child component to wrap with the context consumer. Child component will
 *   receive the props outlined above.
 */
export const withDrupalOauthConsumer = Component => props => (
  <DrupalOauthContext.Consumer>
    {({drupalOauthClient, userAuthenticated, updateAuthenticatedUserState}) => (
      <Component
        {...props}
        drupalOauthClient={drupalOauthClient}
        userAuthenticated={userAuthenticated}
        updateAuthenticatedUserState={updateAuthenticatedUserState}
      />
    )}
  </DrupalOauthContext.Consumer>
);

export default withDrupalOauthConsumer;
