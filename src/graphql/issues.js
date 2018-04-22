export const ISSUES_QUERY = `
  query getAllIssues($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      issues(last: 50, orderBy:{ field:CREATED_AT, direction:DESC }) {
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
