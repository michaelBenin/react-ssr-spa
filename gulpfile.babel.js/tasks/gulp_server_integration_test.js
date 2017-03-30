import mocha from 'gulp-mocha';
import gulp from 'gulp';
import { log } from 'gulp-util';
import config from './../configs/config';

gulp.task('server-integration-test',
  function serverIntegrationTest() {
    return gulp.src(config.test.server.integration.src, {
      read: false
    }).pipe(mocha({ require: 'babel-register' }))
    .once('error', function handleError(err) {
      log(err);
    });
  });
