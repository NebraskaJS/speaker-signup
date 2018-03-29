import ApolloClient from 'apollo-boost';

export const CLIENT_OPTIONS = {
  uri: 'https://api.github.com/graphql',
  request(operation) {
    return new Promise(resolve => {
      operation.setContext({
        headers: {
          authorization: `Bearer HAHAHANOTNOTREALLYCOMEON`, // TODO: implement oauth flow
        },
      });

      resolve();
    });
  },
};

export const client = new ApolloClient(CLIENT_OPTIONS);
