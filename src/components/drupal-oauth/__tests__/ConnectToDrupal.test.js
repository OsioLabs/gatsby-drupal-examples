/* eslint-disable react/prop-types */
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import drupalOauth from '../drupalOauth';
import ConnectToDrupal from '../ConnectToDrupal';

jest.mock('../drupalOauth');

const drupalOauthClient = new drupalOauth();

describe('Component: <SendToDrupal />', () => {
  afterEach(cleanup);

  it('Renders a link to authorize a user against Drupal', () => {
    const { getByText } = render(<ConnectToDrupal drupalOauthClient={drupalOauthClient} title="Connect to Drupal" redirectUri="http://www.example.com" />);
    expect(getByText('Connect to Drupal')).toMatchSnapshot();
  });

  it('Renders a link to register and then authorize a user against Drupal', () => {
    const { getByText } = render(<ConnectToDrupal drupalOauthClient={drupalOauthClient} title="Register with Drupal" redirectUri="http://www.example.com"  useRegistrationLink={true} />);
    expect(getByText('Register with Drupal')).toMatchSnapshot();
  });
});
