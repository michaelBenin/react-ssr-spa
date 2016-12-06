// http://webdriver.io/guide/testrunner/configurationfile.html

exports.config = {
  specs: [
    'test/acceptance/spec/**/*.js'
  ],
  capabilities: [{
    browserName: 'chrome'
  }],
  framework: 'mocha'
};
