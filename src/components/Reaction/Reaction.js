import React from 'react';
import styled from 'react-emotion';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

import { Authentication } from '..';
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

export function Reaction({ children, list }) {
  return (
    <Authentication>
      {({ authenticate, authenticated, token }) => (
        <Container>
          {children}
          <Tooltip
            position="bottom"
            trigger="click"
            html={
              <Reactions
                list={list}
                onReaction={reaction => {
                  if (!authenticated) {
                    const shouldAuthenticate = confirm(
                      'Adding a reaction requires logging in. Log in?'
                    );
                    if (shouldAuthenticate) {
                      authenticate();
                    }
                  }
                }}
              />
            }
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
    </Authentication>
  );
}

Reaction.defaultProps = {
  list: ['THUMBS_UP', 'THUMBS_DOWN', 'LAUGH', 'HOORAY', 'CONFUSED', 'HEART'],
};
