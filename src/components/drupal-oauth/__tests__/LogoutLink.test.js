import React from 'react';
import { render, fireEvent } from "react-testing-library"

// LogoutLink requires DrupalOauthProvider context to work, which requires an
// instance of drupalOauth. So we import those, and create a mock.
import drupalOauth from '../drupalOauth';
import withDrupalOauthProvider from '../withDrupalOauthProvider';
jest.mock('../drupalOauth');
const drupalOauthClient = new drupalOauth();

import LogoutLink from '../LogoutLink';
const Element = withDrupalOauthProvider(drupalOauthClient, LogoutLink);

describe('LogoutLink', () => {
  it('renders correctly', () => {
    // Basic snapshot test.
    const {getByText, asFragment} = render(<Element title="I love to logout" />)
    const firstRender = asFragment()
    expect(firstRender).toMatchSnapshot();

    // Verify that clicking the link triggers the logout function.
    fireEvent.click(getByText(/I love to logout/));
    expect(drupalOauthClient.handleLogout).toHaveBeenCalledTimes(1);
  })
});
