import * as React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

class OauthReciever extends React.Component {
  state = {
    processing: false,
    username: '',
    password: '',
    error: null,
  };

  componentDidMount() {
    this.getAuthorizationCode();
  }

  getAuthorizationCode = () => {

  }

  parseQueryString = () => {
    
  }
}

export default OauthReciever;
