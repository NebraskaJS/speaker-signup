import React, { Component } from 'react';
import styled from 'react-emotion';
import Helmet from 'react-helmet';
import autosize from 'autosize';

import { Authentication, Block } from '../components';

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
  font-size: 24px;
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

export default class NewProposal extends Component {
  componentDidMount() {
    autosize(this.textarea);
  }

  componentWillUnmount() {
    autosize.destroy(this.textarea);
  }

  handleSubmit = ({ authenticate, authenticated, token }) => {
    return ev => {
      ev.preventDefault();
      if (!authenticated) {
        const shouldAuthenticate = confirm(
          `You need to authenticate for that. Sound good?`
        );
        if (shouldAuthenticate) {
          authenticate();
        }
      }
    };
  };

  render() {
    return (
      <Authentication>
        {auth => (
          <React.Fragment>
            <Helmet
              title="Add a proposal"
              meta={[
                {
                  name: 'description',
                  content: `NebraskaJS needs speakers! Use this form to submit a proposal and hopefully everyone will hear your excellent talk soon.`,
                },
              ]}
            />
            <StyledBlock
              title="Add a proposal"
              children={() => (
                <Form name="add-proposal" onSubmit={this.handleSubmit(auth)}>
                  <Label for="title">
                    <Input
                      name="title"
                      id="title"
                      placeholder="Title"
                      required
                    />
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
          </React.Fragment>
        )}
      </Authentication>
    );
  }
}
