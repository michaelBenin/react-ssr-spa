import { expect } from 'chai';

const client = require('../utils/client_util');

describe('Title tests.', function () {
  this.timeout(20000);

  before(function (done) {
    client.init(done);
  });

  it('Homepage should have correct title.', function (done) {
    client
      .url('localhost:8000')
      .getTitle((err, title) => {
        expect(title).to.equal('react-ssr-spa');
      })
      .call(done);
  });
});
