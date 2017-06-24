import supertest from 'supertest';
import { app } from '../../../src/server/services/express_service';

function createVhostTester(supertestApp, vhost) {
  const real = supertest(supertestApp);
  const proxy = {};

  Object.keys(real).forEach(methodName => {
    proxy[methodName] = function() {
      return (
        real
          // eslint-disable-next-line prefer-rest-params, no-unexpected-multiline
          [methodName](...arguments)
          .set('host', vhost)
      );
    };
  });

  return proxy;
}

// example of setting virtual host in supertest, used if
// needing to support multiple domains
// export const sitename = createVhostTester(app, 'example-host.com');

export default createVhostTester(app, 'example-host.com');
