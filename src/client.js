import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
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
});
