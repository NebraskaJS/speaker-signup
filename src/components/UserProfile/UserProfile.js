import React from 'react';
import styled from 'react-emotion';

import { Logout } from './Logout';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ImageContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '::after': {
    display: 'inline-block',
    width: 0,
    height: 0,
    verticalAlign: -2,
    content: JSON.stringify(''),
    border: '4px solid transparent',
    borderTopColor: 'black',
  },
});

const Image = styled.img({
  maxWidth: 28,
  margin: '0.25rem',
});

export function UserProfile({ avatarUrl, className, login, name }) {
  if (!name) {
    return null;
  }

  return (
    <Container className={className}>
      <Logout>
        <ImageContainer>
          <Image src={avatarUrl} />
        </ImageContainer>
      </Logout>
    </Container>
  );
}
