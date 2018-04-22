import React, { Component } from 'react';
import styled from 'react-emotion';
import Helmet from 'react-helmet';
import fetch from 'isomorphic-fetch';
import autosize from 'autosize';

import { Authentication, Block } from '../components';
import { getItem, setItem } from '../util';

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

const PERSISTED_COMMENT_KEY = '__SPEAKER_SIGNUP_PROPOSAL__';

export default class NewProposal extends Component {
  state = {
    body: '',
    error: false,
    status: '',
    title: '',
  };

  componentDidMount() {
    autosize(this.textarea);

    const persistedSubmission = getItem(PERSISTED_COMMENT_KEY);

    if (Object.keys(persistedSubmission).length > 0) {
      this.setState(persistedSubmission);
    }
  }

  componentWillUnmount() {
    autosize.destroy(this.textarea);
  }

  handleChange = ev => {
    const name = ev.target.getAttribute('name');
    this.setState({
      [name]: ev.target.value,
    });
  };

  handleSubmit = ({ authenticate, authenticated, token }) => {
    return ev => {
      ev.preventDefault();
      const { body, title } = this.state;
      setItem(PERSISTED_COMMENT_KEY, {
        body,
        title,
      });
      if (authenticated) {
        this.setState({
          status: 'loading',
        });
        return fetch(`https://api.github.com/repos/dschau/website/issues`, {
          method: 'POST',
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            body,
            labels: ['speaker-signup webapp'],
            title,
          }),
        })
          .then(response => {
            return response.json().then(json => {
              if (!response.ok) {
                throw json.message;
              }
              return json;
            });
          })
          .then(() => {
            this.setState(
              {
                body: '',
                status: 'submitted',
                title: '',
              },
              () => {
                setItem(PERSISTED_COMMENT_KEY, {});
                this.handleTimeout();
              }
            );
          })
          .catch(err => {
            this.setState(
              {
                status: 'error',
                error: err,
              },
              this.handleTimeout(5000)
            );
          });
      }

      const shouldAuthenticate = confirm(
        `You need to authenticate for that. Sound good?`
      );
      if (shouldAuthenticate) {
        authenticate();
      }
    };
  };

  handleTimeout = () => {
    return (duration = 2500) => {
      setTimeout(() => {
        this.setState({
          status: '',
        });
      }, duration);
    };
  };

  getButtonMessage = status => {
    switch (status) {
      case 'submitted':
        return 'Got it. Thanks!';
      case 'error':
        return 'Uh-oh. Looks like something went wrong!';
      default:
        return 'Send it';
    }
  };

  render() {
    const { error, status } = this.state;
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
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                  </Label>
                  <Label for="body">
                    <Textarea
                      name="body"
                      id="body"
                      placeholder="Leave a comment"
                      innerRef={node => (this.textarea = node)}
                      required
                      value={this.state.body}
                      onChange={this.handleChange}
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
                  <Button>{this.getButtonMessage(status)}</Button>
                </Form>
              )}
            />
          </React.Fragment>
        )}
      </Authentication>
    );
  }
}
