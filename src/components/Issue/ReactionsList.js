import React from 'react';
import styled from 'react-emotion';

import { Emoji, ReactionMutation, User } from '..';

const Container = styled.div({
  display: 'flex',
});

const EmojiContainer = styled.button(
  {
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    borderRight: '1px solid #EEE',
    cursor: 'pointer',
    padding: 0,
    paddingRight: '0.5rem',
    backgroundColor: 'transparent',
  },
  ({ reacted }) => ({
    ...(reacted
      ? {
          backgroundColor: '#f1f8ff',
        }
      : {}),
  })
);

const Counter = styled.span({
  fontSize: 14,
});

export function ReactionsList({ list, subjectId }) {
  const uniq = list.reduce((counters, { content, user }) => {
    if (!counters[content]) {
      counters[content] = {
        count: 0,
        users: [],
      };
    }
    counters[content] = Object.assign(counters[content], {
      count: counters[content].count + 1,
      users: counters[content].users.concat(user),
    });
    return counters;
  }, {});
  return (
    <User>
      {({ login = '' }) => (
        <Container>
          {Object.keys(uniq).map(reaction => {
            const { count, users = [] } = uniq[reaction] || {};
            const userReacted = users.some(
              ({ login: reactionLogin }) => reactionLogin === login
            );
            const type = userReacted ? 'remove' : 'add';
            return (
              <ReactionMutation
                key={reaction}
                subjectId={subjectId}
                message="Adding a reaction requires logging in. Log in?"
                type={type}
              >
                {mutation => (
                  <EmojiContainer
                    reacted={userReacted}
                    onClick={() => mutation(reaction)}
                  >
                    <Emoji name={reaction} small />
                    <Counter>{count}</Counter>
                  </EmojiContainer>
                )}
              </ReactionMutation>
            );
          })}
        </Container>
      )}
    </User>
  );
}
