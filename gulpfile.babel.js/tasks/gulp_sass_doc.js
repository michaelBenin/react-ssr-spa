import gulp from 'gulp';
import sassdoc from 'sassdoc';

gulp.task('style-doc', function styleDoc() {
  return gulp.src(['src/**/*.scss', '!src/styles/vendor/**/*.scss']).pipe(
    sassdoc({
      dest: './docs/styles',
      verbose: true
    })
  );
});
