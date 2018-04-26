import React from 'react';
import styled from 'react-emotion';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

import { ReactionMutation } from '..';
import { Trigger } from './Trigger';
import { Emoji } from '..';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 42,
  padding: 0,
  border: '1px solid #e1e4e8',
  borderLeftWidth: 0,
  borderRightWidth: 0,
  marginTop: 'auto',
  marginBottom: '1rem',
});

const ReactionContainer = styled.div({
  display: 'flex',
});

const Reactions = ({ list, onReaction }) => (
  <ReactionContainer>
    {list.map(name => (
      <Emoji
        ariaLabel="Emoji reaction"
        key={name}
        name={name}
        interactive
        onClick={() => onReaction(name)}
      />
    ))}
  </ReactionContainer>
);

export function Reaction({ children, list, subjectId }) {
  return (
    <ReactionMutation
      subjectId={subjectId}
      message="Adding a reaction requires logging in. Log in?"
      type="add"
    >
      {addReaction => (
        <Container>
          {children}
          <Tooltip
            position="bottom"
            trigger="click"
            html={<Reactions list={list} onReaction={addReaction} />}
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
      )}
    </ReactionMutation>
  );
}

Reaction.defaultProps = {
  list: ['THUMBS_UP', 'THUMBS_DOWN', 'LAUGH', 'HOORAY', 'CONFUSED', 'HEART'],
};
