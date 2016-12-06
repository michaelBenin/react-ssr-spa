// https://webpack.github.io/docs/list-of-plugins.html
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'sourcemap',
  entry: path.join(__dirname, '../../src/client/index'),
  output: {
    path: path.join(__dirname, '../../dist/static/js'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false,
        semicolons: true
      }
    }),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [{
      include: /\.json$/,
      loaders: ['json-loader']
    }, {
      test: /\.js$/,
      loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0'],
      exclude: path.join(__dirname, '../../node_modules')
    }]
  }
};
