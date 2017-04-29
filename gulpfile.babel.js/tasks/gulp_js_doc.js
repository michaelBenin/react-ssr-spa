import gulp from 'gulp';
import esdoc from 'gulp-esdoc';

gulp.task('js-doc', function jsDoc() {
  gulp.src(['src']).pipe(
    esdoc({
      destination: 'docs/js'
    })
  );
});
