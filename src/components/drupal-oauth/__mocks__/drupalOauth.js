// __mocks__/drupalOauth.js

const mock = jest.fn().mockImplementation(() => {
  return {
    config: {
      drupal_root: 'http://api.example.com',
      authorize_url: 'http://api.example.com/oauth/authorize',
      token_url: 'http://api.example.com/oauth/token',
      client_id: 'CLIENTID',
      client_secret: 'CLIENTSECRET',
    },
    isLoggedIn: jest.fn(() => Promise.resolve({access_token: 'access-token', token_type: 'Bearer'})),
    handleLogin: jest.fn(() => Promise.resolve({})),
    handleLogout: jest.fn(() => Promise.resolve({})),
    storeToken: jest.fn(),
  };
});

export default mock;
