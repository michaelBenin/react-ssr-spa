import gulp from 'gulp';
import svgmin from 'gulp-svgmin';

gulp.task('svg-min', function gulpSVG() {
  return gulp
    .src(['./dist/static/**/*.svg'])
    .pipe(svgmin())
    .pipe(gulp.dest('./dist/static'));
});
