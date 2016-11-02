import gulp from 'gulp';
import changed from 'gulp-changed';
import babel from 'gulp-babel';
import config from './../configs/config';

gulp.task('babel-server', function babelServer() {
  return gulp.src(config.server.src)
    .pipe(changed(config.dest))
    .pipe(babel({
      sourceMaps: 'inline',
      presets: [
        'react',
        'node5'
      ]
    }))
    .pipe(gulp.dest(config.dest));
});
