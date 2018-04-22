const path = require('path');
require('dotenv').config({
  path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

module.exports = {
  siteMetadata: {
    title: 'Speaker Signup',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'metaContent',
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/util/typography.js',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-github',
      options: {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        queries: [
          [
            `query getIssues($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
              issues(last: 50, orderBy:{ field:CREATED_AT, direction:DESC }) {
                pageInfo {
                  endCursor
                }
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
                            login
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }`,
            { owner: process.env.REPO_OWNER, name: process.env.REPO_NAME },
          ],
        ],
      },
    },
  ],
};
