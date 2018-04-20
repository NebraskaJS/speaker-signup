const { modifyBabelrc } = require('gatsby-plugin-emotion/gatsby-browser');

exports.onCreateNode = require('./gatsby/on-create-node');
exports.createPages = require('./gatsby/create-pages');
exports.modifyBabelrc = modifyBabelrc;
