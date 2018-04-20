import React from 'react';
import styled from 'react-emotion';
import { Query } from 'react-apollo';
import GatsbyLink from 'gatsby-link';
import gql from 'graphql-tag';
import slugify from 'slugify';

import { Block, Issue } from '..';
import { idx } from '../../util';
import { ISSUES_QUERY } from '../../graphql';

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

const merge = (updated, list) => {
  const lookup = list.reduce((lookupTable, { node }, index) => {
    lookupTable[node.id] = index;
    return lookupTable;
  }, {});

  return updated.reduce((merged, { node, ...rest }) => {
    const clone = {
      ...rest,
      node: {
        ...node,
        fields: {
          slug: `/proposal/${slugify(node.id)}`,
        },
      },
    };
    const index = typeof lookup[node.id] === 'number' ? lookup[node.id] : -1;
    if (index > -1) {
      merged[index] = clone;
    } else {
      merged.push(clone);
    }
    return merged;
  }, list.slice(0));
};

export function Issues({
  list = [],
  owner,
  name,
  title = 'Open proposals',
  state = 'OPEN',
}) {
  const { pageInfo = {} } = list[0].node || {};
  return (
    <Query query={gql(ISSUES_QUERY)} variables={{ owner, name, state }}>
      {({ data }) => (
        <Block
          title={title}
          children={() => {
            const merged = merge(
              idx(data, _ => data.repository.issues.edges, []),
              list
            );
            return (
              <React.Fragment>
                <Grid>
                  {merged.map(({ node }) => (
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
    </Query>
  );
}

Issues.defaultProps = {
  owner: 'nebraskajs',
  name: 'speaker-signup',
};
