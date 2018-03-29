import React from 'react';
import Link from 'gatsby-link';

import { Issues } from '../components';

export default function IndexPage({ data }) {
  const { issues } = data;
  return <Issues list={issues.edges} />;
}

export const indexQuery = graphql`
  query IndexPageQuery {
    issues: allGithubIssues(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          ...IssueFragment
        }
      }
    }
  }
`;
