import gulp from 'gulp';
import config from './../configs/config';

gulp.task('copy-assets', function copyAssets() {
  return gulp.src(config.assets.src).pipe(gulp.dest(config.assets.dest));
});
