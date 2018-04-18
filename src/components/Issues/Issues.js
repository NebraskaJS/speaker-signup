import React from 'react';
import styled from 'react-emotion';
import GatsbyLink from 'gatsby-link';

import { Block, Issue } from '..';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 100%;

  padding: 1rem;

  @media only screen and (min-width: 768px) {
    grid-template-columns: 50% 50%;
  }
`;

const Link = styled(GatsbyLink)`
  display: block;
  color: #aaa;
  font-size: 14px;
  text-align: center;
  padding: 0.5rem 0;
`;

export function Issues({ list, title = 'Open proposals' }) {
  return (
    <Block
      title={title}
      children={() => (
        <React.Fragment>
          <Grid>
            {list.map(({ node }) => <Issue key={node.id} {...node} />)}
          </Grid>
          {title.indexOf('Open') > -1 ? (
            <Link to="/closed">Check out closed proposals</Link>
          ) : (
            <Link to="/">Check out open proposals</Link>
          )}
        </React.Fragment>
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
