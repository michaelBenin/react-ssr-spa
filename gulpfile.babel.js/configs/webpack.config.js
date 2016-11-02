// http://qiita.com/kimagure/items/f2d8d53504e922fe3c5c
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../../src/client/index')
  ],
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/static'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        include: /\.json$/,
        loaders: ['json-loader']
      }, {
        test: /\.js$/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'],
        include: path.join(__dirname, '../../src')
      }]
  }
};
