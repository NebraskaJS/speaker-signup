import React from 'react';

import { Issues } from '../components';

export default function IndexPage({ data }) {
  const { proposals } = data;
  return <Issues list={proposals.edges} />;
}

export const indexQuery = graphql`
  query IndexPageQuery {
    proposals: allGithubIssues(
      sort: { fields: [createdAt], order: DESC }
      filter: { state: { ne: "CLOSED" } }
    ) {
      edges {
        node {
          ...IssueFragment
        }
      }
    }
  }
`;
