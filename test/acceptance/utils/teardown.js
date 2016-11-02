import client from './client_util';

describe('Closing the webdriver client.', function () {
  this.timeout(20000);

  it('Stops the webdriver client.', function (done) {
    client.end(done);
  });
});
