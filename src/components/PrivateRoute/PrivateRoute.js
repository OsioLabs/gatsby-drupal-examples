import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import withDrupalOauthConsumer from '../drupal-oauth/withDrupalOauthConsumer';

const PrivateRoute = ({ component: Component, location, userAuthenticated, ...rest }) => {
  if (!userAuthenticated) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/`)
    return null
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default withDrupalOauthConsumer(PrivateRoute);
