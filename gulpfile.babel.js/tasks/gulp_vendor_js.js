import gulp from 'gulp';
import config from './../configs/config';

gulp.task('vendor-js', function vendorJS() {
  return gulp.src(config.vendorJS.src).pipe(gulp.dest(config.vendorJS.dest));
});
