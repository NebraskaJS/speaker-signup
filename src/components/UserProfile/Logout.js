import React from 'react';
import styled from 'react-emotion';
import { ApolloConsumer } from 'react-apollo';
import { Tooltip } from 'react-tippy';

import { AUTHENTICATION_KEY } from '..';
import { setItem } from '../../util';

const Button = styled.button({
  color: '#24292e',
  backgroundColor: '#eff3f6',
  backgroundImage: 'linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%)',
  padding: '6px 12px',
  cursor: 'pointer',
  border: '1px solid rgba(27,31,35,0.2)',
  borderRadius: '0.25em',
  minWidth: 100,
  ':hover': {
    backgroundColor: '#e6ebf1',
    backgroundImage: 'linear-gradient(-180deg, #f0f3f6 0%, #e6ebf1 90%)',
    backgroundPosition: '-.5em',
    borderColof: 'rgba(27,31,35,0.35)',
  },
  ':active': {
    backgroundColor: '#e9ecef',
    backgroundImage: 'none',
    borderColor: 'rgba(27,31,35,0.35)',
    boxShadow: 'inset 0 0.15em 0.3em rgba(27,31,35,0.15)',
  },
});

const reset = client => {
  setItem(AUTHENTICATION_KEY, null);
  return client.resetStore().then(() => {
    location.reload();
  });
};

export function Logout({ children }) {
  return (
    <ApolloConsumer>
      {client => (
        <Tooltip
          position="bottom"
          trigger="click"
          html={<Button onClick={() => reset(client)}>Log out</Button>}
          animation="scale"
          duration={150}
          theme="light"
          interactive
          arrow
          arrowSize="big"
        >
          {children}
        </Tooltip>
      )}
    </ApolloConsumer>
  );
}
