// http://qiita.com/kimagure/items/f2d8d53504e922fe3c5c
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'bluebird',
      'history/createBrowserHistory',
      'react-router-config',
      'lodash/get',
      'axios',
      'redux',
      'react-router-redux',
      'react-redux',
      'prop-types',
      'exenv'
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
    new webpack.optimize.CommonsChunkPlugin({
      // filename: "vendor.js"
      // (Give the chunk a different name)
      name: 'vendor',
      chunks: ['app'],
      minChunks(module /* , count */) {
        const { context } = module;
        return context && context.indexOf('node_modules') >= 0;
      },
      // (the commons chunk name)

      filename: 'vendor.js'
      // children: true
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
