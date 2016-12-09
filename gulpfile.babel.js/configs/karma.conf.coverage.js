const path = require('path');

const travis = process.env.TRAVIS_CI;

// https://github.com/karma-runner/karma-coverage
module.exports = function karmaConfIntegration(config) {
  const conf = {

    browsers: (travis ? ['Chrome_travis_ci'] : ['Chrome']),

    files: [
      path.join(__dirname, '../../test/client/unit/**/*'),
      path.join(__dirname, '../../test/client/integration/**/*')
    ],

    exclude: [
      path.join(__dirname, '../../src/client/index.js')
    ],

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

    reporters: ['coverage'],

    webpack: {
      devtool: 'sourcemap',
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel',
          include: [
            path.join(__dirname, '../../test'),
            path.join(__dirname, '../../src/client')
          ],
          exclude: path.join(__dirname, '../../node_modules'),
          query: {
            presets: ['es2015', 'react', 'stage-0']
          }
        }],
        postLoaders: [
          {
            test: /\.js$/,
            loader: 'istanbul-instrumenter',
            include: path.join(__dirname, '../../src/client') }
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
    },

    coverageReporter: {
      dir: path.join(__dirname, '../../karma_coverage'),
      reporters: [
        { type: 'lcov' }
      ]
    }
  };

  conf.preprocessors[path.join(__dirname, '../../test/client/integration/**/*')] = [
    'webpack',
    'sourcemap'
  ];

  conf.preprocessors[path.join(__dirname, '../../test/client/unit/**/*')] = [
    'webpack',
    'sourcemap'
  ];

  conf.preprocessors[path.join(__dirname, '../../src/client/**/*.js')] = [
    'coverage'
  ];

  config.set(conf);
};

