const path = require('path');

// TODO: http://nicolasgallagher.com/how-to-test-react-components-karma-webpack/
module.exports = function karmaConfUnit(config) {
  const conf = {
    browsers: ['Chrome'],
    // karma only needs to know about the test bundle
    files: [
      path.join(__dirname, '../../test/client/unit/**/*')
    ],
    frameworks: ['mocha'],
    plugins: [
      // 'karma-chai',
      'karma-mocha',
      'karma-chrome-launcher',
      // 'karma-sourcemap-loader',
      'karma-webpack'
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {},
    reporters: ['dots'],
    singleRun: true,
    // webpack config object
    webpack: {
      devtool: 'sourcemap',
      module: {
        loaders: [{
          test: /\.js$/,
          loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0'],
          exclude: path.join(__dirname, '../../node_modules')
        }]
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  };

  conf.preprocessors[path.join(__dirname, '../../test/client/unit/**/*')] = [
    'webpack'
  // 'sourcemap'
  ];
  config.set(conf);
};

