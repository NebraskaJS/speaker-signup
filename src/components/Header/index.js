import React from 'react';
import styled from 'react-emotion';
import Link from 'gatsby-link';

import { AddNew } from './add-new';
import { Logo } from './logo';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fcf01a;
  padding: 2rem 0.5rem;
`;

export const Header = () => (
  <HeaderContainer>
    <Logo children={({ Title }) => <Title>NEJS Proposals</Title>} />
    <AddNew />
  </HeaderContainer>
);
