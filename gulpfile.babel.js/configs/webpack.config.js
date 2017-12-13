// http://qiita.com/kimagure/items/f2d8d53504e922fe3c5c
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    vendor: [
      'fontfaceobserver',
      'react',
      'react-dom',
      'bluebird',
      'history/createBrowserHistory',
      'react-router-config',
      'react-router/Switch',
      'react-router/Route',
      'react-helmet',
      'react-transition-group/TransitionGroup',
      'react-transition-group/CSSTransition',
      'react-error-boundary',
      'lodash/get',
      'axios',
      'redux',
      'redux-thunk',
      'react-router-redux',
      'react-redux',
      'prop-types',
      'exenv',
      'scriptjs'
    ],
    app: [
      'react-hot-loader/patch',
      // activate HMR for React

      'webpack-dev-server/client?http://localhost:3001',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

      path.join(__dirname, '../../src/client/index')
    ]
  },
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/static'
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        RUNTIME_ENV: JSON.stringify('browser')
      }
    }),
    new ManifestPlugin({ writeToFileEmit: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app'],
      minChunks(module /* , count */) {
        const { context } = module;
        return context && context.indexOf('node_modules') >= 0;
      },
      filename: 'vendor.js'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin()
    // do not emit compiled assets that include errors
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
              plugins: ['react-hot-loader/babel', 'transform-react-jsx-source']
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
};
