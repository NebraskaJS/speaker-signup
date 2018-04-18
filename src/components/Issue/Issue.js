import React from 'react';
import styled from 'react-emotion';
import Link from 'gatsby-link';

import { ReactionsList } from './ReactionsList';
import { Reaction } from '..';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media only screen and (min-width: 768px) {
    margin: 1rem;
  }
`;

const Title = styled.h3`
  margin: 0.5rem 0;
  text-transform: uppercase;
`;

export function Issue({ author, bodyHTML, fields, reactions, title, url }) {
  return (
    <Container>
      <Link
        to={fields.slug}
        css={{
          color: 'inherit',
          textDecoration: 'underline',
          textDecorationSkip: 'ink',
        }}
      >
        <Title>{title}</Title>
      </Link>
      <div
        css={{ fontFamily: 'Lato, sans-serif' }}
        dangerouslySetInnerHTML={{ __html: bodyHTML }}
      />
      <Reaction>
        <ReactionsList list={reactions.edges.map(({ node }) => node.content)} />
      </Reaction>
    </Container>
  );
}

export const issueFragment = graphql`
  fragment IssueFragment on GithubIssues {
    id
    author {
      avatarUrl
      login
      url
    }
    fields {
      slug
    }
    bodyHTML
    title
    url
    createdAt
    reactions {
      edges {
        node {
          content
        }
      }
    }
  }
`;
