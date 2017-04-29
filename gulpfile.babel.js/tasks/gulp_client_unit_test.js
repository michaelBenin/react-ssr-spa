import gulp from 'gulp';
import path from 'path';

const Server = require('karma').Server;

const karmaAuto = process.env.KARMA_AUTOWATCH;
const singleRun = karmaAuto !== 'on';

gulp.task('client-unit-test', function clientUnitTests(done) {
  new Server(
    {
      configFile: path.join(
        __dirname,
        '../../gulpfile.babel.js/configs/karma.conf.unit.js'
      ),
      singleRun
    },
    done
  ).start();
});
