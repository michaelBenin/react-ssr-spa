const webdriverio = require('webdriverio');

const options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};

module.exports = webdriverio
  .remote(options);
