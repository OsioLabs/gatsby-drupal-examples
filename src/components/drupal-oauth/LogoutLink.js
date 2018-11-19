import React from 'react';
import PropTypes from 'prop-types';
import withDrupalOauthConsumer from './withDrupalOauthConsumer';

const LogoutLink = (props) => {
  if (props.drupalOauthClient) {
    return(
        <a
        href="#"
        onClick={async (event) => {
          event.preventDefault();
          await props.drupalOauthClient.handleLogout();
          props.updateAuthenticatedUserState(false);
        }}
      >
        {props.title}
      </a>
    );
  }

  return('');
};

LogoutLink.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withDrupalOauthConsumer(LogoutLink);
