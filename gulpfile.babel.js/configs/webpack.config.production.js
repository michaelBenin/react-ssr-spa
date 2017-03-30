// https://webpack.github.io/docs/list-of-plugins.html
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, '../../src/client/index'),
  output: {
    path: path.join(__dirname, '../../dist/static/js'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        RUNTIME_ENV: JSON.stringify('browser')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false,
        semicolons: true
      }
    })
  ],
  module: {
    loaders: [
      {
        include: /\.json$/,
        loaders: ['json-loader']
      }, {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, '../../src'),
        exclude: path.join(__dirname, '../../node_modules'),
        query: {
          presets: ['react', ['env', {
            targets: {
              browsers: ['last 2 versions']
            }
          }]]
        }
      }]
  }
};
