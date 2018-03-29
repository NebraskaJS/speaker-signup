import React from 'react';
import { Query } from 'react-apollo';
import styled from 'react-emotion';
import gql from 'graphql-tag';

import { Block, Issue } from '..';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 100%;

  padding: 1rem;

  @media only screen and (min-width: 768px) {
    grid-template-columns: 50% 50%;
  }
`;

export function Issues({ list }) {
  return (
    <Block
      title="Open Proposals"
      children={() => (
        <Grid>{list.map(({ node }) => <Issue key={node.id} {...node} />)}</Grid>
      )}
    />
  );
}

// export function Issues() {
//   return (
//     <Query
//       query={gql`
//         query {
//           repository(owner: "nebraskajs", name: "speaker-signup") {
//             issues(last: 20, states: OPEN) {
//               edges {
//                 node {
//                   ...IssueFragment
//                 }
//               }
//             }
//           }
//         }
//         ${Issue.fragments.issue}
//       `}
//       children={({ loading, error, data }) => {
//         if (loading) {
//           return <p>Loading...</p>;
//         } else if (error) {
//           return <p>An error!</p>;
//         }

//         return data.repository.issues.edges.map(({ node: issue }) => (
//           <Issue key={issue.id} {...issue} />
//         ));
//       }}
//     />
//   );
// }
