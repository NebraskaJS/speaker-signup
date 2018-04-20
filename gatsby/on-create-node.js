const slugify = require('slugify');

module.exports = function onCreateNode({ node, boundActionCreators, getNode }) {
  const { createNodeField } = boundActionCreators;

  switch (node.internal.type) {
    case 'GithubIssues':
      createNodeField({ node, name: 'type', value: 'proposal' });
      createNodeField({
        node,
        name: 'slug',
        value: `/proposal/${slugify(node.id)}`,
      });
      break;
    default:
      return;
  }
};
