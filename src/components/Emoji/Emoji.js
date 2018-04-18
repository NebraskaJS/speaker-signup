import React from 'react';
import styled from 'react-emotion';

const EmojiContainer = styled.span(
  {
    fontSize: 24,
    padding: '0.5rem',
    transition: '175ms cubic-bezier(0.64, 0.57, 0.67, 1.53)',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
  },
  ({ interactive, small }) => ({
    ...(small
      ? {
          fontSize: 20,
        }
      : {}),
  })
);

const EmojiButton = styled(EmojiContainer)({
  cursor: 'pointer',
  ':hover': {
    transform: 'scale(1.2)',
  },
}).withComponent('button');

const EMOJI_MAP = {
  CONFUSED: '😕',
  HEART: '❤️',
  HOORAY: '🎉',
  LAUGH: '😄',
  THUMBS_DOWN: '👎',
  THUMBS_UP: '👍',
};

export function Emoji({ ariaLabel, className, name, ...rest }) {
  const Container = rest.interactive ? EmojiButton : EmojiContainer;
  return (
    <Container aria-label={ariaLabel} className={className} {...rest}>
      {EMOJI_MAP[name]}
    </Container>
  );
}
