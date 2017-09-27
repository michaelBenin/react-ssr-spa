const path = require('path');
const webpack = require('webpack');

const travis = process.env.TRAVIS_CI;

// https://github.com/karma-runner/karma-coverage
module.exports = function karmaConfIntegration(config) {
  const conf = {
    browsers: travis ? ['Chrome_travis_ci'] : ['Chrome'],

    files: [
      path.join(__dirname, '../../test/shared/utils/**/*.js'),
      path.join(__dirname, '../../test/client/unit/**/*'),
      path.join(__dirname, '../../test/client/integration/**/*'),
      path.join(__dirname, '../../test/shared/**/*'),
      {
        pattern: path.join(__dirname, '../../src/client/**/*.js'),
        watched: false,
        included: false,
        served: true,
        nocache: true
      }
    ],

    exclude: [path.join(__dirname, '../../src/client/index.js')],

    frameworks: ['mocha'],

    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-sourcemap-loader'
    ],

    singleRun: true,
    autoWatch: false,

    preprocessors: {},

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      reporters: [
        {
          subdir: '.',
          type: 'lcov'
        }
      ],
      dir: path.join(__dirname, '../../', 'karma_coverage')
    },

    webpack: {
      devtool: 'sourcemap',
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('development'),
            RUNTIME_ENV: JSON.stringify('browser')
          }
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
      ],
      externals: {
        cheerio: 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
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
                  plugins: ['istanbul']
                }
              }
            ],
            exclude: /node_modules/
          }
        ]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  };

  conf.preprocessors[
    path.join(__dirname, '../../test/client/integration/**/*')
  ] = ['webpack', 'sourcemap'];

  conf.preprocessors[path.join(__dirname, '../../test/client/unit/**/*')] = [
    'webpack',
    'sourcemap'
  ];

  conf.preprocessors[path.join(__dirname, '../../src/client/**/*.js')] = [
    'webpack',
    'sourcemap',
    'coverage'
  ];

  conf.preprocessors[path.join(__dirname, '../../test/shared/**/*')] = [
    'webpack',
    'sourcemap',
    'coverage'
  ];

  config.set(conf);
};
