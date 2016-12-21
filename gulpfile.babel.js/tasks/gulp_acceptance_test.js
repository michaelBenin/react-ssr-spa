import gulp from 'gulp';
import webdriver from 'gulp-webdriver';
import selenium from 'selenium-standalone';
import runSequence from 'run-sequence';
import { log } from 'gulp-util';
import { join } from 'path';

const configPath = join(
  __dirname,
  '../../gulpfile.babel.js/configs/wdio.conf.js'
);

gulp.task('webdriver', () => gulp.src(configPath).pipe(webdriver()));

gulp.task('selenium', (done) => {
  if (!process.env.TRAVIS_CI) {
    return selenium.install({
      logger(message) {
        log(message);
      }
    }, (err) => {
      if (err) {
        return done(err);
      }
      return selenium.start((serr, child) => {
        if (serr) {
          return done(serr);
        }
        const startServer = require('../../dist/server');// eslint-disable-line global-require, max-len
        return startServer.default.then(() => {
          selenium.child = child;
          done();
        });
      });
    });
  }
  const startServer = require('../../dist/server');// eslint-disable-line global-require, max-len
  return startServer.default.then(done);
});

gulp.task('kill', () => {
  if (!process.env.TRAVIS_CI) {
    selenium.child.kill();
  }
  const gracefulExit = require('../../dist/server/utils/graceful_exit_util'); // eslint-disable-line global-require, max-len
  gracefulExit.default(false, true);
});

gulp.task('acceptance-test', (callback) => {
  runSequence(
    'selenium',
    'webdriver',
    'kill',
    callback);
});
