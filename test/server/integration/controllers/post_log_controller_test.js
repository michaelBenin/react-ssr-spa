import { expect } from 'chai';
import server from '../../../utils/app_util';

describe('post log controller/route test', function () {
  this.timeout(1000);
  it('Should give the correct response for empty obj', function () {
    return server
      .post('/api/v1/log')
      .set('Accept', 'application/json')
      .send({})
      .expect(405)
      .then((res) => {
        expect(res.header['x-powered-by']).to.equal(undefined);
      });
  });
});
