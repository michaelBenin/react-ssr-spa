/* eslint-disable import/no-dynamic-require */
import gulp from 'gulp';
import path from 'path';
import { Server } from 'karma';
import { log } from 'gulp-util';

const redisPath = '../../dist/server/services/redis_service';
const serverPath = '../../dist/server/services/server_service';
const karmaAuto = process.env.KARMA_AUTOWATCH;
const singleRun = (karmaAuto !== 'on');

gulp.task('client-integration-test',
  function clientIntegrationTest(done) {
    const startServer = require('../../dist/server'); // eslint-disable-line global-require

    startServer.default.then(function handleStartServer() {
      new Server({
        configFile: path.join(__dirname,
          '../../gulpfile.babel.js/configs/karma.conf.integration.js'),
        singleRun
      }, function end() {
        require(serverPath) // eslint-disable-line global-require
          .createOrGetServer()
          .close(function closeServer() {
            const redis = require(redisPath).default; // eslint-disable-line global-require
            if (redis.quit) { redisPath.quit(); }
            log('Closing express server');
            done();
          });
      }).start();
    }).catch(function handleError(err) {
      log(err);
      require(serverPath) // eslint-disable-line global-require
        .createOrGetServer()
        .close(function closeServer() {
          require(redisPath).default.quit(); // eslint-disable-line global-require
          log('Closing express server with error.');
          done();
        });
    });
  });

