import mocha from 'gulp-mocha';
import gulp from 'gulp';
import { log } from 'gulp-util';
import config from './../configs/config';

gulp.task('server-unit-test', function serverUnitTeset() {
  return gulp.src(config.test.server.unit.src, {
    read: false
  }).pipe(mocha()).once('error', function handleError(err) {
    log(err);
  });
});
