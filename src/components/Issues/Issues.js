import React from 'react';
import styled from 'react-emotion';
import GatsbyLink from 'gatsby-link';

import { Block, Issue, IssuesConsumer } from '..';
import { idx } from '../../util';

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

export function Issues({
  list = [],
  title = 'Open proposals',
  state = 'OPEN',
}) {
  return (
    <IssuesConsumer state={state}>
      {({ data }) => (
        <Block
          title={title}
          children={() => {
            const issues = idx(data, _ => data.repository.issues.edges, []);
            return (
              <React.Fragment>
                <Grid>
                  {issues.map(({ node }) => (
                    <Issue key={node.id} state={state} {...node} />
                  ))}
                </Grid>
                {title.indexOf('Open') > -1 ? (
                  <Link to="/closed">Check out closed proposals</Link>
                ) : (
                  <Link to="/">Check out open proposals</Link>
                )}
              </React.Fragment>
            );
          }}
        />
      )}
    </IssuesConsumer>
  );
}
