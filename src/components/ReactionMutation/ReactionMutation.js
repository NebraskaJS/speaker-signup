import React from 'react';
import { ApolloConsumer, Mutation } from 'react-apollo';

import gql from 'graphql-tag';

import { Authentication } from '..';
import { GET_REACTION_MUTATION, ISSUES_QUERY } from '../../graphql';

const augmentReactions = ({ reactions, payload, type }) => {
  const clone = reactions.edges.splice(0);
  if (type === 'remove') {
    const index = clone.findIndex(
      ({ node }) => node.id === payload.reaction.id
    );
    clone.splice(index, 1);
  } else if (type === 'add') {
    clone.push({ ...payload, node: payload.reaction });
  }
  return {
    ...reactions,
    edges: clone,
  };
};

export function ReactionMutation({
  children,
  message,
  subjectId,
  state = 'OPEN',
  type = 'add',
}) {
  return (
    <ApolloConsumer>
      {client => (
        <Authentication>
          {({ authenticate, authenticated }) => (
            <Mutation
              mutation={gql(GET_REACTION_MUTATION(type))}
              onCompleted={() => client.resetStore()}
            >
              {mutation => {
                const addMutation = reaction => {
                  if (authenticated) {
                    return mutation({
                      variables: { subjectId, content: reaction, state },
                    });
                  }
                  const shouldAuthenticate = confirm(message);
                  if (shouldAuthenticate) {
                    authenticate();
                  }
                };

                return children(addMutation);
              }}
            </Mutation>
          )}
        </Authentication>
      )}
    </ApolloConsumer>
  );
}
