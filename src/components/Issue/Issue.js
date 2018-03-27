import React from 'react';
import gql from 'graphql-tag';

export function Issue({ author, bodyHTML, title, url }) {
  return (
    <div>
      <a href={url} target="_blank" rel="noopener">
        {title} by {author.login}
      </a>
      <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
    </div>
  );
}

Issue.fragments = {
  issue: gql`
    fragment IssueFragment on Issue {
      id
      author {
        avatarUrl
        login
        url
      }
      bodyHTML
      title
      url
    }
  `,
};
