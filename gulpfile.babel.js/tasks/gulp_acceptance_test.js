/*eslint-disable */
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import selenium from 'selenium-standalone';
import runSequence from 'run-sequence';

gulp.task('webdriver', () => {
  return gulp.src([
    'test/acceptance/utils/initializer_util.js',
    'test/acceptance/spec/**/*.js',
    'test/acceptance/utils/teardown.js'
  ], {
    read: false
  }).pipe(mocha())
    .on('error', function (err) {
      console.error(err);
    });
});

gulp.task('selenium', function (done) {
  selenium.install({
    logger(message) {
      console.info(message);
    }
  }, function (err) {
    if (err) {
      return done(err);
    }
    selenium.start(function (err, child) {
      if (err) {
        return done(err);
      }
      var startServer = require('../../dist/server');
      startServer.default.then(function () {
        selenium.child = child;
        done();
      });
    });
  });
});

gulp.task('kill', function () {
  selenium.child.kill();
  var gracefulExit = require('../../dist/server/utils/graceful_exit_util');
  gracefulExit.default();
});

gulp.task('acceptance-test', function (callback) {
  runSequence(
    'selenium',
    'webdriver',
    'kill',
    callback);
});
/*eslint-enable */
