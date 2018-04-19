import React from 'react';
import { render } from 'react-testing-library';
import 'dom-testing-library/extend-expect';

import Proposal from '../proposal';

const getProps = (proposal = {}) => ({
  data: {
    proposal,
  },
});

test('it renders author', () => {
  const props = getProps({
    author: {
      avatarUrl: 'https://github.com/dschau.png',
      url: 'https://github.com/dschau',
      login: 'dschau',
    },
  });

  const { container, getByText } = render(<Proposal {...props} />);

  const author = getByText(props.data.proposal.author.login);

  expect(author).toBeInTheDOM();
  expect(author.getAttribute('href')).toBe(props.data.proposal.author.url);
});

test('it renders title', () => {
  const props = getProps({
    author: {},
    title: 'Hello World',
  });

  const { container, getByText } = render(<Proposal {...props} />);

  expect(getByText(props.data.proposal.title)).toBeInTheDOM();
});

test('it renders image', () => {
  const props = getProps({
    author: {
      avatarUrl: 'https://github.com/dschau.png',
      url: 'https://github.com/dschau',
      login: 'dschau',
    },
  });

  const { container } = render(<Proposal {...props} />);

  const avatar = container.querySelector('[data-test-id="author-avatar"]');

  expect(avatar.getAttribute('src')).toBe(props.data.proposal.author.avatarUrl);
});
