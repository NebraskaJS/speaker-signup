import React from 'react';
import styled from 'react-emotion';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

import { Trigger } from './Trigger';
import { Emoji } from '..';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 60,
  padding: '0.25rem 0',
  border: '1px solid #EEE',
  borderLeftWidth: 0,
  borderRightWidth: 0,
  marginTop: 'auto',
  marginBottom: '1rem',
});

const ReactionContainer = styled.div({
  display: 'flex',
});

const Reactions = ({ list }) => (
  <ReactionContainer>
    {list.map(name => (
      <Emoji ariaLabel="Emoji reaction" key={name} name={name} interactive />
    ))}
  </ReactionContainer>
);

export function Reaction({ children, list }) {
  return (
    <Container>
      {children}
      <Tooltip
        position="bottom"
        trigger="click"
        html={<Reactions list={list} />}
        animation="scale"
        duration={150}
        theme="light"
        interactive
        arrow
        arrowSize="big"
      >
        <Trigger />
      </Tooltip>
    </Container>
  );
}

Reaction.defaultProps = {
  list: ['THUMBS_UP', 'THUMBS_DOWN', 'LAUGH', 'HOORAY', 'CONFUSED', 'HEART'],
};
