import React from 'react';
import { Router } from 'react-router-dom';
import { onClientEntry } from 'gatsby-plugin-emotion/gatsby-browser';

import { ApolloAuthenticationProvider } from './src/client';

exports.onClientEntry = onClientEntry;

exports.replaceRouterComponent = function({ history }) {
  const App = ({ children }) => (
    <ApolloAuthenticationProvider>
      <Router history={history}>{children}</Router>
    </ApolloAuthenticationProvider>
  );

  return App;
};
