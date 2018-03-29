import React, { Component } from 'react';
import styled from 'react-emotion';
import autosize from 'autosize';

import { Block } from '../components';

const Form = styled.form`
  padding: 1rem;
  margin: 0;
`;

const Label = styled.label`
  display: block;
  margin: 1rem 0;
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #ccc;
  border-radius: 0;

  font-family: sans-serif;
  font-size: 22px;
  padding: 1rem 0.5rem;
  transition: 175ms ease-in-out;
  width: 100%;

  &[required] {
    box-shadow: none;
  }

  :focus {
    border-color: black;
  }
`;

Input.defaultProps = {
  type: 'text',
};

const Textarea = styled(Input)`
  resize: none;
`.withComponent('textarea');

const Button = styled.button`
  border: 6px solid black;
  border-radius: 6px;
  width: 100%;
  padding: 1rem 0.5rem;
  font-family: Lato, sans-serif;
  font-size: 24px;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;

  background-color: white;
  color: black;

  :hover {
    background-color: black;
    color: white;
    border-color: black;
  }

  @media only screen and (min-width: 768px) {
    max-width: 50%;
  }
`;

Button.defaultProps = {
  type: 'submit',
};

const StyledBlock = styled(Block)`
  ::before {
    left: auto;
    right: -13%;
  }
`;

const handleSubmit = ev => {
  ev.preventDefault();
};

export default class NewProposal extends Component {
  componentDidMount() {
    autosize(this.textarea);
  }

  render() {
    return (
      <StyledBlock
        title="Add a proposal"
        children={() => (
          <Form name="add-proposal" onSubmit={handleSubmit}>
            <Label for="title">
              <Input name="title" id="title" placeholder="Title" required />
            </Label>
            <Label for="comment">
              <Textarea
                id="comment"
                placeholder="Leave a comment"
                innerRef={node => (this.textarea = node)}
                required
              />
              <small
                css={{
                  color: '#aaa',
                  display: 'block',
                  fontFamily: 'sans-serif',
                  padding: '0.25rem 0',
                }}
              >
                Note: markdown is supported
              </small>
            </Label>
            <Button>Send it</Button>
          </Form>
        )}
      />
    );
  }
}
