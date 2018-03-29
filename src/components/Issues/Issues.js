import React from 'react';
import { Query } from 'react-apollo';
import styled from 'react-emotion';
import gql from 'graphql-tag';

import { Issue } from '..';

const Container = styled.section`
  border-radius: 6px;
  border: 6px solid black;
  padding: 6px; /* 6 6 6 */
  margin: 6px;
  position: relative;
  background-color: white;

  ::before {
    content: '';
    background: #fcf01a;
    width: 80%;
    height: 80%;
    bottom: -7%;
    max-width: 700px;
    position: absolute;
    left: -13%;
    z-index: -1;
  }
`;

const Title = styled.h2`
  font-weight: 900;
  font-size: 32px;
  text-align: center;
  text-transform: uppercase;

  margin: 1rem 0;
`;

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
    <Container>
      <Title>Open Proposals</Title>
      <Grid>{list.map(({ node }) => <Issue key={node.id} {...node} />)}</Grid>
    </Container>
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
