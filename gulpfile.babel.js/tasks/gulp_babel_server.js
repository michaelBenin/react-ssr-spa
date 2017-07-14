import gulp from 'gulp';
import { log } from 'gulp-util';
import changed from 'gulp-changed';
import babel from 'gulp-babel';
import config from './../configs/config';

gulp.task('babel-server', function babelServer() {
  const babelStream = babel({
    sourceMaps: 'inline',
    presets: [
      'react',
      [
        'env',
        {
          targets: {
            node: 'current'
          }
        }
      ]
    ]
  });

  babelStream.on('error', function handleError(err) {
    log(`Error transpiling babel in gulp_babel_server task.`);
    log(err);
    babelStream.end();
  });

  return gulp
    .src(config.server.src)
    .pipe(changed(config.dest))
    .pipe(babelStream)
    .pipe(gulp.dest(config.dest));
});
