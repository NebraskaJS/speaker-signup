import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { VIEWER_QUERY } from '../../graphql';

const UserContext = React.createContext('user');

export function UserProvider({ children }) {
  return (
    <Query query={gql(VIEWER_QUERY)}>
      {({ data = {} }) => {
        const { viewer = {} } = data;
        return (
          <UserContext.Provider value={viewer}>{children}</UserContext.Provider>
        );
      }}
    </Query>
  );
}

export const User = UserContext.Consumer;
