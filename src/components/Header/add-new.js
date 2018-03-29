import React from 'react';
import styled from 'react-emotion';
import { Logo } from './logo';

const StyledLogo = styled(Logo)`
  background-color: white;
  padding: 0.5rem;

  :hover,
  .active & {
    background-color: black;

    .title {
      color: #fcf01a;
    }
  }

  @media only screen and (min-width: 768px) {
    padding: 1rem;
  }
`;

export function AddNew() {
  return (
    <StyledLogo
      to="/add"
      children={({ Title }) => <Title className="title">Add proposal</Title>}
    />
  );
}
