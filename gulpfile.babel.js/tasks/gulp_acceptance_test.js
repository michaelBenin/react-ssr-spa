import gulp from 'gulp';
import webdriver from 'gulp-webdriver';
import runSequence from 'run-sequence';
// import { log } from 'gulp-util';
import { join } from 'path';

const configPath = join(
  __dirname,
  '../../gulpfile.babel.js/configs/wdio.conf.js'
);

gulp.task('webdriver', () =>
  gulp.src(configPath).pipe(
    webdriver({
      logLevel: 'verbose'
    })
  )
);

gulp.task('start-test-server', (done) => {
  require('../../dist/server').default.then(done); // eslint-disable-line global-require, max-len
});

gulp.task('kill', () => {
  const gracefulExit = require('../../dist/server/utils/graceful_exit_util'); // eslint-disable-line global-require, max-len
  gracefulExit.default(false, true);
});

gulp.task('acceptance-test', (callback) => {
  runSequence('start-test-server', 'webdriver', 'kill', callback);
});
