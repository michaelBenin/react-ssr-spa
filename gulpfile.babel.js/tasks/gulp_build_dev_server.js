import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build-dev-server', function buildDevServer(callback) {
  runSequence(
    ['sass-dev', 'babel-server', 'webpack-dev-server'],
    'dev-server',
    callback
  );
});
