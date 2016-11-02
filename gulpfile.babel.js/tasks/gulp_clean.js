import gulp from 'gulp';
import del from 'del';
import config from './../configs/config';

gulp.task('clean', function clean(cb) {
  del(config.clean, cb);
});
