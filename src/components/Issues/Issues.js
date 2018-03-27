import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Issue } from '..';

export function Issues() {
  return (
    <Query
      query={gql`
        query {
          repository(owner: "nebraskajs", name: "speaker-signup") {
            issues(last: 20, states: OPEN) {
              edges {
                node {
                  ...IssueFragment
                }
              }
            }
          }
        }
        ${Issue.fragments.issue}
      `}
      children={({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        } else if (error) {
          return <p>An error!</p>;
        }

        return data.repository.issues.edges.map(({ node: issue }) => (
          <Issue key={issue.id} {...issue} />
        ));
      }}
    />
  );
}
