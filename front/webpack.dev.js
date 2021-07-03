const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');

const config = merge(base, {
  mode: 'development',
  devtool: 'source-map',
});

module.exports = config;
