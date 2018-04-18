import React from 'react';
import styled from 'react-emotion';

import { Plus } from './Plus';
import { Smiley } from './Smiley';

const Container = styled.button({
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  fill: '#586069',
  cursor: 'pointer',
  ':hover': {
    fill: '#0366d6',
  },
});

export function Trigger() {
  return (
    <Container>
      <Plus />
      <Smiley />
    </Container>
  );
}
