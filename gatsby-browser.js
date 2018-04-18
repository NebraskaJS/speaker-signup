import React from 'react';
import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import { client } from './src/client';

exports.replaceRouterComponent = function({ history }) {
  const App = ({ children }) => (
    <ApolloProvider client={client}>
      <Router history={history}>{children}</Router>
    </ApolloProvider>
  );

  return App;
};
