import React from 'react';
import PropTypes from 'prop-types';

const RegisterLink = (props) => (
  <a
    href={process.env.API_URL + "/user/register?destination-uri=" + window.location.href}
  >{props.title}</a>
);

RegisterLink.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RegisterLink;
