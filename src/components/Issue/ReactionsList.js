import React from 'react';
import styled from 'react-emotion';

import { Emoji } from '..';

const Container = styled.div({
  display: 'flex',
});

const EmojiContainer = styled.button({
  display: 'flex',
  alignItems: 'center',
  border: 'none',
  borderRight: '1px solid #EEE',
  cursor: 'pointer',
  padding: 0,
  paddingRight: '0.5rem',
  backgroundColor: 'transparent',
});

const Counter = styled.span({
  fontSize: 14,
});

export function ReactionsList({ list }) {
  const uniq = list.reduce((counters, name) => {
    counters[name] = (counters[name] || 0) + 1;
    return counters;
  }, {});
  return (
    <Container>
      {Object.keys(uniq).map(key => (
        <EmojiContainer key={key}>
          <Emoji name={key} small />
          <Counter>{uniq[key]}</Counter>
        </EmojiContainer>
      ))}
    </Container>
  );
}
