import { expect } from 'chai';

import server from '../../utils/app_util';

describe('Ping controller/route test', function () {
  this.timeout(1000);
  it('Should give the correct response or ping', function () {
    return server
      .get('/api/v1/ping')
      .expect(200)
      .then((res) => {
        expect(res.text).to.equal('pong');
        expect(res.header['x-powered-by']).to.equal(undefined);
      });
  });
});
