import React from 'react';

import { Issues } from '../components';

export default function Closed({ data }) {
  const { proposals } = data;
  return (
    <Issues list={proposals.edges} title="Closed proposals" closedProposals />
  );
}

export const closedQuery = graphql`
  query ClosedPageQuery {
    proposals: allGithubIssues(
      sort: { fields: [createdAt], order: DESC }
      filter: { state: { eq: "CLOSED" } }
    ) {
      edges {
        node {
          ...IssueFragment
        }
      }
    }
  }
`;
