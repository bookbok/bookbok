const path = require('path')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app/app.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../public/bundle'),
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[id]-[chunkhash].js',
    publicPath: '/bundle/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'app'),
    },
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['node_modules'],
  },
  plugins: [new WebpackManifestPlugin()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
}
