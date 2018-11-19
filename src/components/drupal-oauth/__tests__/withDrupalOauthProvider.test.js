import React from 'react';
import { render } from "react-testing-library"
import 'jest-dom/extend-expect'
import drupalOauth from '../drupalOauth';
jest.mock('../drupalOauth');
const drupalOauthClient = new drupalOauth();

import withDrupalOauthProvider from '../withDrupalOauthProvider';

const Dummy = (props) => (
  <p>Hello there</p>
);

describe('withDrupalOauthProvider', () => {
  it('wraps components with a provider', () => {
    const Component = withDrupalOauthProvider(drupalOauthClient, Dummy);
    // @todo: Make this test actually assert something, like that there's a
    // component wrapped with a context provider or something ...
    const {getByText} = render(<Component />);
    const element = getByText('Hello there');
    expect(element).toHaveTextContent(/Hello there/);
    expect(drupalOauthClient.isLoggedIn).toHaveBeenCalledTimes(1);
  });
});
