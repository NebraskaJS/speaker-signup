import React from 'react';
import styled from 'react-emotion';

const Container = styled.button(
  {
    fontSize: 24,
    padding: '0.5rem',
    transition: '175ms cubic-bezier(0.64, 0.57, 0.67, 1.53)',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
  },
  ({ interactive, small }) => ({
    ...(interactive
      ? {
          cursor: 'pointer',
          ':hover': {
            transform: 'scale(1.2)',
          },
        }
      : {}),
    ...(small
      ? {
          fontSize: 20,
        }
      : {}),
  })
);

const EMOJI_MAP = {
  CONFUSED: '😕',
  HEART: '❤️',
  HOORAY: '🎉',
  LAUGH: '😄',
  THUMBS_DOWN: '👎',
  THUMBS_UP: '👍',
};

export function Emoji({ ariaLabel, className, name, ...rest }) {
  return (
    <Container aria-label={ariaLabel} className={className} {...rest}>
      {EMOJI_MAP[name]}
    </Container>
  );
}
