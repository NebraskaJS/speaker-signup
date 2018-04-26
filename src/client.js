import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import {
  AUTHENTICATION_KEY,
  Authentication,
  AuthenticationProvider,
} from './components';
import { getItem } from './util';

export const CLIENT_OPTIONS = {
  uri: 'https://api.github.com/graphql',
  ssrMode: true,
};

export const getClient = (token = getItem(AUTHENTICATION_KEY)) => {
  return new ApolloClient({
    ...CLIENT_OPTIONS,
    request(operation) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

export const ApolloAuthenticationProvider = ({ children }) => (
  <AuthenticationProvider>
    <Authentication>
      {({ token }) => {
        return (
          <ApolloProvider client={getClient(token)}>{children}</ApolloProvider>
        );
      }}
    </Authentication>
  </AuthenticationProvider>
);
