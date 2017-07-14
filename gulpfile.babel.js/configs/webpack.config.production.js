// https://webpack.github.io/docs/list-of-plugins.html
const path = require('path');
const webpack = require('webpack');
const ShakePlugin = require('webpack-common-shake').Plugin;

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
    new ShakePlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
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
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['react'],
                [
                  'env',
                  {
                    targets: {
                      browsers: ['last 2 versions']
                    }
                  }
                ]
              ],
              plugins: ['react-hot-loader/babel']
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
};
