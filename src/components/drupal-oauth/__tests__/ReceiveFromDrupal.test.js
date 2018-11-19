/* eslint-disable react/prop-types */
import React from 'react';
import { render, cleanup, wait, waitForElement } from 'react-testing-library';
import drupalOauth from '../drupalOauth';
import ReceiveFromDrupal from '../ReceiveFromDrupal';

jest.mock('../drupalOauth');

const drupalOauthClient = new drupalOauth();
ReceiveFromDrupal.fetchToken = jest.fn(() => Promise.resolve({}));

describe('Component: <ReceiveFromDrupal />', () => {
  beforeEach(() => {
    fetch.resetMocks();
    drupalOauthClient.storeToken.mockClear();

    // The OauthReceiver component looks for the ?code query string parameter
    // and then uses that if it exists to request a token from Drupal. We need
    // to act like there is one in the URL otherwise the component just errors
    // out and we can't test a happy path.
    window.history.pushState({}, '', '?code=TACOCAT');
  });

  afterEach(cleanup);

  // Happy path. :)
  it('Does what it is supposed to ...', async () => {
    const onSuccess = jest.fn();

    const response = {
      token_type: 'Bearer',
      expires_in: 300,
      access_token: 'ACCESS_TOKEN',
      refresh_token: 'REFRESH_TOKEN',
    }
    fetch.mockResponseOnce(JSON.stringify(response));

    const { getByTestId } = render(<ReceiveFromDrupal
      drupalOauthClient={drupalOauthClient}
      redirectUri="http://www.example.com"
      onSuccess={onSuccess}
    />);

    await waitForElement(() => getByTestId('receiver'));
    expect(fetch).toHaveBeenCalledTimes(1)

    await wait(() =>
      // This is triggered by the handleSuccess callback.
      expect(drupalOauthClient.storeToken).toHaveBeenCalledTimes(1)
    )

    expect(onSuccess).toHaveBeenCalledTimes(1)
  });

  // Sad path. :(
  it('Breaks when it is supposed to ...', async () => {
    fetch.resetMocks();
    fetch.mockReject(new Error('fake error message'));

    const { getByTestId } = render(<ReceiveFromDrupal drupalOauthClient={drupalOauthClient} redirectUri="http://www.example.com" />);
    await waitForElement(() => getByTestId('receiver'));

    expect(fetch).toHaveBeenCalledTimes(1)

    await wait(() =>
      // This is triggered by the handleSuccess callback. So when there is an
      // error it shouldn't be displayed.
      expect(drupalOauthClient.storeToken).not.toHaveBeenCalledTimes(1)
    );

    expect(getByTestId('receiver')).toHaveTextContent(/fake error message/);
  });
});
