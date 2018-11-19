class drupalOauth {
  /**
   *
   * @param config
   * - drupal_root:
   * - token_url:
   * - authorize_url:
   * - client_id:
   * - client_secret:
   */
  constructor(config) {
    this.config = config;
    this.config.token_url = `${this.config.drupal_root}/oauth/token`;
    this.config.authorize_url = `${this.config.drupal_root}/oauth/authorize`;
  }

  /**
   * Check to see if the current user is logged in.
   *
   * If the user was previously logged in but their access token is expired
   * attempt to retrieve a new token.
   *
   * @returns <Mixed>
   *   The current users authorization token, or false.
   */
  isLoggedIn() {
    let token = localStorage.getItem('drupal-oauth-token') !== null ? JSON.parse(localStorage.getItem('drupal-oauth-token')) : null;

    if (token === null) {
      return false;
    }

    // If we've got an active token, assume the user is logged in.
    if (token !== null && token.expirationDate > Math.floor(Date.now() / 1000)) {
      return token;
    } else {
      // If not, see if we can get a refresh token.
      this.getRefreshToken(token, '').then((token) => {
        if (token !== null) {
          return token;
        }

        return false;
      })
    }
  };

  /**
   *
   */
  async handleLogin(username, password, scope) {
    return this.fetchOauthToken(username, password, scope);
  };

  /**
   * Log the current user out.
   *
   * Deletes the token from local storage.
   */
  async handleLogout() {
    return localStorage.removeItem('drupal-oauth-token');
  };

  async getOauthToken(username, password, scope) {
    return this.fetchOauthToken(username, password, scope);
  };

  async getRefreshToken(token, scope) {
    return this.refreshOauthToken(token, scope);
  };

  /**
   * Get an OAuth token from Drupal.
   *
   * Exchange a username and password for an OAuth token.
   * @param username
   * @param password
   * @param scope
   * @returns {Promise<void>}
   *   Returns a promise that resolves with the new token returned from Drupal.
   */
  async fetchOauthToken(username, password, scope) {
    let formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('client_id', this.config.client_id);
    formData.append('client_secret', this.config.client_secret);
    formData.append('scope', scope);
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(this.config.token_url, {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
      }),
      body: formData,
    });

    if (response.ok) {
      const json = await response.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      return this.storeToken(json);
    }
  };

  /**
   * Exchange your refresh token for a new auth token.
   *
   * @param token
   * @param scope
   *
   * @returns {Promise<void>}
   *  Returns a Promise that resolves with the new token retrieved from Drupal.
   */
  async refreshOauthToken(token, scope) {
    if (token !== null) {
      let formData = new FormData();
      formData.append('grant_type', 'refresh_token');
      formData.append('client_id', this.config.client_id);
      formData.append('client_secret', this.config.client_secret);
      formData.append('scope', scope);
      formData.append('refresh_token', token.refresh_token);

      const response = await fetch(this.config.token_url, {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
        }),
        body: formData,
      });

      if (response.ok) {
        const json = await response.json();

        if (json.error) {
          throw new Error(json.error.message);
        }

        return this.storeToken(json);
      }

      throw new Error(response.status);
    }
  };

  storeToken(json) {
    let token = Object.assign({}, json);
    token.date = Math.floor(Date.now() / 1000);
    token.expirationDate = token.date + token.expires_in;
    localStorage.setItem('drupal-oauth-token', JSON.stringify(token));
    return token;
  }
}

export default drupalOauth;
