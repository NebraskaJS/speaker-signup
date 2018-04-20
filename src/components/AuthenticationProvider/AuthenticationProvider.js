import React, { Component } from 'react';
import qs from 'querystring';
import fetch from 'isomorphic-fetch';

import { getItem, setItem } from '../../util/local-storage';

const AuthenticationContext = React.createContext('authentication');

export const AUTHENTICATION_KEY = '__SPEAKER_SIGNUP_AUTHENTICATION__';

export class AuthenticationProvider extends Component {
  state = {
    authenticated: false,
    token: '',
  };

  componentDidMount() {
    const { code } = qs.parse(location.search);
    if (code) {
      const {
        redirectURI,
        clientId,
        clientSecret,
        scope,
      } = this.getAuthenticationParams();
      const params = qs.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectURI,
      });
      /*
       * TODO: Fix this is dog shit
       */
      fetch(
        `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?${params}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
        }
      )
        .then(response => response.json())
        .then(json => {
          const { access_token } = json;
          if (access_token) {
            history.replaceState('', '', location.href.replace(/\?.*/, ''));
            this.setState(
              {
                authenticated: true,
                token: access_token,
              },
              () => {
                setItem(AUTHENTICATION_KEY, this.state);
              }
            );
          }
        });
    } else {
      const stored = getItem(AUTHENTICATION_KEY);
      if (stored.token) {
        this.setState({
          ...stored,
        });
      }
    }
  }

  getAuthenticationParams = () => {
    const redirectURI = location.href;
    const isLocalHost = redirectURI.includes('localhost');
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const scope = ['repo'].join(' ');

    return {
      redirectURI,
      clientId,
      clientSecret,
      scope,
    };
  };

  authenticate = () => {
    const { redirectURI, clientId, scope } = this.getAuthenticationParams();
    location.replace(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect-uri=${redirectURI}&scope=${scope}`
    );
  };

  render() {
    const { children } = this.props;
    return (
      <AuthenticationContext.Provider
        value={{
          ...this.state,
          authenticate: this.authenticate,
        }}
      >
        {children}
      </AuthenticationContext.Provider>
    );
  }
}

export const Authentication = AuthenticationContext.Consumer;
