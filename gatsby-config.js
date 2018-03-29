require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Speaker Signup',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/util/typography.js',
      },
    },
    {
      resolve: '@dschau/gatsby-source-github',
      options: {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        queries: [
          `{
                  repository(owner: "nebraskajs", name: "speaker-signup") {
                    issues(last: 20, states: OPEN) {
                      edges {
                        node {
                          id
                          author {
                            avatarUrl
                            login
                            url
                          }
                          bodyHTML
                          title
                          url
                          createdAt
                        }
                      }
                    }
                  }
                }`,
        ],
      },
    },
  ],
};
