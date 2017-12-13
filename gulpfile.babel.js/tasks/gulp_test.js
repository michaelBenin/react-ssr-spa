import gulp from 'gulp';
import runSequence from 'run-sequence';
import { log } from 'gulp-util';

gulp.task('test', function test(cb) {
  runSequence(
    'js-lint-src',
    'js-lint-test',
    'js-lint-gulp',
    'client-integration-test',
    'server-integration-test',
    'client-unit-test',
    'server-unit-test',
    'style-lint',
    // 'acceptance-test',

    err => {
      if (err) {
        const exitCode = 2;
        log('[ERROR] gulp build task failed', err);
        log(`[FAIL] gulp build task failed - exiting with code ${exitCode}`);
        return process.exit(exitCode);
      }
      return cb();
    }
  );
});
