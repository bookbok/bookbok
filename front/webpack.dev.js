const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')

const config = merge(base, {
  mode: 'development',
})

module.exports = config
