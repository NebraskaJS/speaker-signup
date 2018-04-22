import React, { Component } from 'react';

import { IssuesConsumer } from '../components';
import ProposalComponent from '../templates/proposal';

export default class Proposal extends Component {
  state = {
    id: '',
  };

  componentDidMount() {
    const id = location.pathname.split('/').pop();

    this.setState({
      id,
    });
  }

  render() {
    return (
      <IssuesConsumer>
        {({ getIssue }) => {
          const issue = getIssue(this.state.id) || {};
          if (!issue.id) {
            return <h1>The specified proposal could not be found.</h1>;
          }

          return <ProposalComponent data={{ proposal: issue }} />;
        }}
      </IssuesConsumer>
    );
  }
}
