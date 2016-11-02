import gulp from 'gulp';
import path from 'path';

const Server = require('karma').Server;

gulp.task('client-unit-test',
  function clientUnitTests(done) {
    new Server({
      configFile: path.join(__dirname, '../../gulpfile.babel.js/configs/karma.conf.unit.js'),
      singleRun: true
    }, done).start();
  });
