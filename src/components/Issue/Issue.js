import React from 'react';
import styled from 'react-emotion';
import Link from 'gatsby-link';

const Container = styled.div`
  margin: 6px;
`;

const Title = styled.h3`
  margin: 0.5rem 0;
  font-weight: 900;
  text-transform: uppercase;
`;

export function Issue({ author, bodyHTML, title, url }) {
  return (
    <Container>
      <Link
        to={url}
        target="_blank"
        rel="noopener"
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
    bodyHTML
    title
    url
    createdAt
  }
`;
