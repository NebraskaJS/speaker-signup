import React from 'react';
import styled from 'react-emotion';
import Link from 'gatsby-link';

import { AddNew } from './add-new';
import { Logo } from './logo';
import { User, UserProfile } from '..';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fcf01a;
  padding: 48px 0.5rem;
  padding-bottom: 12px;
  position: relative;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    padding: 2.5rem 0.5rem;
  }
`;

export const Header = () => (
  <HeaderContainer>
    <Logo children={({ Title }) => <Title>NEJS Proposals</Title>} />
    <User>
      {user => (
        <UserProfile
          css={{ position: 'absolute', top: 4, right: 4 }}
          {...user}
        />
      )}
    </User>
    <AddNew />
  </HeaderContainer>
);
