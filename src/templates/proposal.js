import React from 'react';
import styled from 'react-emotion';

import { APPEAR_IN } from '../style';

const Container = styled.main`
  animation: ${APPEAR_IN} 275ms cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

const Title = styled.h1`
  color: black;
  font-size: 32px;
  text-transform: uppercase;

  margin: 1rem 0;
  padding: 0.25rem 0;
  border-bottom: 1px solid black;

  @media only screen and (min-width: 768px) {
    font-size: 48px;
  }
`;

const Author = styled.h2`
  color: #666;
  font-size: 20px;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 0.5rem;

  @media only screen and (min-width: 768px) {
    font-size: 32px;
  }
`;

const Description = styled.div`
  padding: 1rem 0;

  border-bottom: 1px solid #eee;
`;

const Image = styled.img`
  display: block;
  max-width: 100px;
  max-height: 100px;
  border-radius: 100px;

  margin: 0 auto;
  text-align: center;
`;

const Link = styled.a`
  color: inherit;
  text-decoration-skip: ink;
`;

Link.defaultProps = {
  rel: 'noopener',
  target: '_blank',
};

export default function Proposal({ data }) {
  const { proposal } = data;
  const { author, bodyHTML, title } = proposal;
  return (
    <Container>
      <Title>{title}</Title>
      <Author>
        <Link href={author.url}>{author.login}</Link>
      </Author>
      <Image src={author.avatarUrl} data-test-id="author-avatar" />
      <Description dangerouslySetInnerHTML={{ __html: bodyHTML }} />
    </Container>
  );
}

export const proposalQuery = graphql`
  query GetProposalBySlug($id: String!) {
    proposal: githubIssues(id: { eq: $id }) {
      ...IssueFragment
    }
  }
`;
