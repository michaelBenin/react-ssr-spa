import server from '../../../utils/app_util';

describe('React router middleware test', function () {
  this.timeout(1000);
  it('Should have a 404 status for the not found route.', function () {
    return server
      .get('/404')
      .expect(404);
  });
});
