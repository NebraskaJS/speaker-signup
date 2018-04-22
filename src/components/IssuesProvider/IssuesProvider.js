import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import slugify from 'slugify';

import { idx, getItem, setItem } from '../../util';
import { ISSUES_QUERY } from '../../graphql';

const IssuesContext = React.createContext('issues');

const ISSUES_KEY = '__SPEAKER_SIGNUP_ISSUES__';

const extendNode = ({ node, ...rest }) => ({
  ...rest,
  node: {
    ...node,
    fields: {
      slug: `/proposal/${slugify(node.id)}`,
    },
  },
});

const merge = (data, list) => {
  const lookup = list.reduce((lookupTable, { node }, index) => {
    lookupTable[node.id] = index;
    return lookupTable;
  }, {});

  const issues = idx(data, _ => data.repository.issues.edges, []);

  if (issues.length > 0) {
    return Object.assign({}, data, {
      repository: {
        issues: {
          edges: issues.reduce((merged, issue) => {
            const { node, ...rest } = issue;
            const clone = extendNode(issue);
            const index =
              typeof lookup[node.id] === 'number' ? lookup[node.id] : -1;
            if (index > -1) {
              merged[index] = clone;
            } else {
              merged.push(clone);
            }
            return merged;
          }, list.slice(0)),
        },
      },
    });
  }

  return data;
};

export class IssuesProvider extends Component {
  static defaultProps = {
    name: 'nebraskajs',
    owner: 'speaker-signup',
    state: 'OPEN',
  };

  state = {
    issues: {},
  };

  componentDidMount() {
    this.setState({
      issues: getItem(ISSUES_KEY),
    });
  }

  getIssue(data) {
    return id => {
      const issues = idx(data, _ => data.repository.issues.edges, []);
      const index = issues.findIndex(({ node }) => slugify(node.id) === id);

      if (index > -1) {
        console.log(extendNode(issues[index]).node);
        return extendNode(issues[index]).node;
      }

      return {};
    };
  }

  render() {
    const { children, owner, name, state } = this.props;
    return (
      <Query query={gql(ISSUES_QUERY)} variables={{ owner, name, state }}>
        {({ data }) => {
          return (
            <IssuesContext.Provider
              value={{ data: merge(data, []), getIssue: this.getIssue(data) }}
            >
              {children}
            </IssuesContext.Provider>
          );
        }}
      </Query>
    );
  }
}

export const IssuesConsumer = IssuesContext.Consumer;
