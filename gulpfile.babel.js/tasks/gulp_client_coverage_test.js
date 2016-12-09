import gulp from 'gulp';
import path from 'path';
import { Server } from 'karma';
import { log } from 'gulp-util';

const redisPath = '../../dist/server/services/redis_service';
const serverPath = '../../dist/server/services/express_service';

gulp.task('client-coverage',
  function clientIntegrationTest(done) {
    const startServer = require('../../dist/server'); // eslint-disable-line global-require, import/no-dynamic-require

    startServer.default.then(function handleStartServer() {
      new Server({
        configFile: path.join(__dirname,
          '../../gulpfile.babel.js/configs/karma.conf.coverage.js'),
        singleRun: true
      }, function end() {
        require(serverPath) // eslint-disable-line global-require, import/no-dynamic-require
          .createOrGetServer()
          .close(function closeServer() {
            // eslint-disable-next-line global-require, import/no-dynamic-require
            const redis = require(redisPath).default;
            if (redis.quit) {
              redisPath.quit();
            }
            log('Closing express server');
            done();
          });
      }).start();
    }).catch(function handleError(err) {
      log(err);
      require(serverPath) // eslint-disable-line global-require, import/no-dynamic-require
        .createOrGetServer()
        .close(function closeServer() {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          require(redisPath).default.quit();
          log('Closing express server with error.');
          done();
        });
    });
  });

