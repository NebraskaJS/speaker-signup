import React from 'react';
import styled from 'react-emotion';
import Link from 'gatsby-link';

const Container = styled.div`
  display: inline-block;
  padding: 1rem;
  border: 3px solid black;
  border-radius: 3px;
  padding: 0.5rem;
  transition: background-color 75ms ease-in-out;
  :hover {
    background-color: white;
  }

  @media only screen and (min-width: 768px) {
    border-width: 6px;
    border-radius: 6px;
    padding: 2rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 900;
  font-family: Lato, sans-serif;
  text-transform: uppercase;

  @media only screen and (min-width: 768px) {
    font-size: 32px;
  }
`;

export function Logo({ children, to = '/', ...rest }) {
  return (
    <Link to={to} css={{ textDecoration: 'none', color: 'inherit' }}>
      <Container {...rest}>{children({ Title })}</Container>
    </Link>
  );
}
