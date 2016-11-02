import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build-prod', [
  'sass-prod',
  'webpack-prod',
  'babel-server',
  'copy-assets'
], function prod(callback) {
  runSequence(
    [
      'svg-min'
    ],
    callback);
});
