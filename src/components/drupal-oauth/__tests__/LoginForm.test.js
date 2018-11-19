import React from 'react';
import { render, fireEvent, cleanup } from "react-testing-library"

// LoginForm requires DrupalOauthProvider context to work, which requires an
// instance of drupalOauth. So we import those, and create a mock.
import drupalOauth from '../drupalOauth';
import withDrupalOauthProvider from '../withDrupalOauthProvider';
jest.mock('../drupalOauth');
const drupalOauthClient = new drupalOauth();

import LoginForm from '../LoginForm';

describe('LoginForm', async () => {
  afterEach(cleanup)

  beforeEach(() => {
    drupalOauthClient.handleLogin.mockClear();
  });

  // Happy path. :)
  it('renders correctly and can be submitted', () => {
    const TestElement = withDrupalOauthProvider(drupalOauthClient, LoginForm);

    // Basic snapshot test.
    const {getByValue, getByLabelText, asFragment} = render(<TestElement />)
    const firstRender = asFragment()
    expect(firstRender).toMatchSnapshot();

    // Verify that if you fill out the form and click submit that it calls the
    // drupalOauth.handleLogin() method.
    const username = getByLabelText(/Username/);
    fireEvent.change(username, {
      target: {value: 'joe'},
    })

    const password = getByLabelText(/Password/);
    fireEvent.change(password, {
      target: {value: 'password'},
    })

    fireEvent.click(getByValue(/Log in/));
    expect(drupalOauthClient.handleLogin).toHaveBeenCalledTimes(1);
    expect(drupalOauthClient.handleLogin.mock.calls[0][0]).toBe('joe');
    expect(drupalOauthClient.handleLogin.mock.calls[0][1]).toBe('password');
  })

  // Sad path. :(
  it('displays errors', () => {
    drupalOauthClient.handleLogin.mockImplementation(() => {
      throw new Error('Oh no everything is broken');
    });

    const TestElement = withDrupalOauthProvider(drupalOauthClient, LoginForm);
    const {getByValue, getByText} = render(<TestElement />)

    fireEvent.click(getByValue(/Log in/));

    expect(getByText('Unable to complete your login request.')).toBeTruthy();
    expect(drupalOauthClient.handleLogin).toHaveBeenCalledTimes(1);
  });
});
