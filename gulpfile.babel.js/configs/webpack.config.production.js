// https://webpack.github.io/docs/list-of-plugins.html
const path = require('path');
const webpack = require('webpack');
const ShakePlugin = require('webpack-common-shake').Plugin;

module.exports = {
  devtool: 'source-map',
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
    app: path.join(__dirname, '../../src/client/index')
  },
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
              ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
};
