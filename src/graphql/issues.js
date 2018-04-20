export const ISSUES_QUERY = `
  query getNewIssues($owner: String!, $name: String!, $state: IssueState!) {
    repository(owner: $owner, name: $name) {
      issues(last: 50, states: [$state], orderBy:{ field:CREATED_AT, direction:DESC }) {
        edges {
          node {
            id
            author {
              avatarUrl
              login
              url
            }
            bodyHTML
            state
            title
            url
            createdAt
            reactions(first:10) {
              edges {
                node {
                  content
                  id
                  user {
                    avatarUrl
                    login
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
