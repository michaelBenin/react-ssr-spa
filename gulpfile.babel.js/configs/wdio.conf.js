// http://webdriver.io/guide/testrunner/configurationfile.html
// browser config stolen from vue
// https://github.com/vuejs/vue/blob/dev/build/karma.sauce.config.js

const conf = {
  services: ['selenium-standalone'],
  specs: [
    'test/acceptance/spec/**/*.js'
  ],
  capabilities: [{
    browserName: 'chrome'
  }],
  framework: 'mocha',
  mochaOpts: {
    require: 'babel-register'
  }
};

if (process.env.TRAVIS_CI) {
  conf.services = ['selenium-standalone', 'sauce'];
  conf.sauceConnect = true;
  conf.user = process.env.SAUCE_USERNAME;
  conf.key = process.env.SAUCE_ACCESS_KEY;
  conf.capabilities = [{
    browserName: 'safari',
    platform: 'OS X 10.10',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    name: 'react-ssr-spa-acceptance',
    build: process.env.TRAVIS_BUILD_NUMBER
  }, {
    browserName: 'chrome',
    platform: 'Windows 7',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    name: 'react-ssr-spa-acceptance',
    build: process.env.TRAVIS_BUILD_NUMBER
  }, {
    browserName: 'firefox',
    platform: 'Windows 7',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    name: 'react-ssr-spa-acceptance',
    build: process.env.TRAVIS_BUILD_NUMBER
  }, {
    browserName: 'internet explorer',
    version: '9',
    platform: 'Windows 7',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    name: 'react-ssr-spa-acceptance',
    build: process.env.TRAVIS_BUILD_NUMBER
  }, {
    browserName: 'internet explorer',
    version: '10',
    platform: 'Windows 8',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    name: 'react-ssr-spa-acceptance',
    build: process.env.TRAVIS_BUILD_NUMBER
  }, {
    browserName: 'internet explorer',
    version: '11',
    platform: 'Windows 8.1',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    name: 'react-ssr-spa-acceptance',
    build: process.env.TRAVIS_BUILD_NUMBER
  }, {
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    name: 'react-ssr-spa-acceptance',
    build: process.env.TRAVIS_BUILD_NUMBER
  }];
}

exports.config = conf;
