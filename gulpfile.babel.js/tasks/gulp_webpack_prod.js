import gulp from 'gulp';
import webpack from 'webpack';
import gutil from 'gulp-util';
import conf from '../configs/webpack.config.production';

gulp.task('webpack-prod', function webpackProd(callback) {
  webpack(conf, function runWebpackProd(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({}));
    callback();
  });
});
