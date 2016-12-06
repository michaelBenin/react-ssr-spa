import typeDetect from 'type-detect';
import { expect } from 'chai';
import redisClient from '../../../src/server/services/redis_service';
import { createOrGetServer } from '../../../src/server/services/express_service';

describe('#closeConnections tests', function () {
  it('Should close connections without error.', function (done) {
    this.timeout(10000);
    expect(typeDetect(createOrGetServer)).to.equal('function');

    if (redisClient.quit) {
      redisClient.quit();
    }

    createOrGetServer().close();
    done();
  });
});
