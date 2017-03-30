// http://qiita.com/kimagure/items/f2d8d53504e922fe3c5c
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, '../../src/client/index')
  ],
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/static'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        RUNTIME_ENV: JSON.stringify('browser')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  exclude: [path.join(__dirname, '../../src/server/services')],
  module: {
    loaders: [
      {
        include: /\.json$/,
        loaders: ['json-loader']
      }, {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, '../../src'),
        exclude: [
          path.join(__dirname, '../../node_modules')
        ],
        query: {
          presets: ['react', ['env', {
            targets: {
              browsers: ['last 2 versions']
            }
          }]],
          plugins: ['react-hot-loader/babel']
        }
      }]
  }
};
