import gulp from 'gulp';
import livereload from 'gulp-livereload';
import config from './../configs/config';

gulp.task(
  'dev',
  ['vendor-js', 'copy-assets', 'build-dev-server'],
  function dev() {
    livereload.listen();
    gulp.watch(config.styles.main.scssWatch, ['sass-dev']);
    gulp.watch(config.server.src, ['babel-server']);
  }
);
