// http://webdriver.io/guide/testrunner/configurationfile.html

const conf = {
  services: ['selenium-standalone'],
  specs: ['test/acceptance/spec/**/*.js'],
  capabilities: [
    {
      browserName: 'chrome'
    }
  ],
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
  conf.capabilities = [
    {
      browserName: 'chrome',
      version: '42',
      platform: 'XP',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      name: 'react-ssr-spa-acceptance',
      build: process.env.TRAVIS_BUILD_NUMBER
    }
  ];
}

exports.config = conf;
