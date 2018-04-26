module.exports = function onCreatePage({ page, boundActionCreators }) {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    // Make the front page match everything client side.
    // Normally your paths should be a bit more judicious.
    if (page.path.includes('/proposal')) {
      page.matchPath = `/proposal/:path`;
      createPage(page);
    }
    resolve();
  });
};
