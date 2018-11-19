import React from 'react';
import { render } from "react-testing-library"
import withDrupalOauthConsumer from '../withDrupalOauthConsumer';


describe('withDrupalOauthConsumer', () => {
  it('wraps components with a consumer', () => {
    const output = withDrupalOauthConsumer(<p>Hello there</p>);
    // @todo: Make this test actually assert something, like that there's a
    // component wrapped with a context consumer or something ...
  });
});
