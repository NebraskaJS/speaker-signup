const path = require('path');
const slugify = require('limax');

module.exports = function createPages({ boundActionCreators, graphql }) {
  const { createPage } = boundActionCreators;

  return graphql(`
    {
      proposals: allGithubIssues(sort: { fields: [createdAt], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            id
            title
            url
            createdAt
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      console.error(result.errors);
      return Promise.reject(result.errors);
    }

    const proposalTemplate = path.resolve('src/templates/proposal.js');

    const { proposals } = result.data;

    proposals.edges.forEach(({ node }) => {
      const { slug } = node.fields;
      createPage({
        path: slug,
        component: proposalTemplate,
        context: {
          id: node.id,
          slug,
        },
      });
    });
  });
};
