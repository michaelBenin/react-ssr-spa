import gulp from 'gulp';
import gutil from 'gulp-util';
import nodemon from 'gulp-nodemon';
import config from './../configs/config';

gulp.task('dev-server', function devServer() {
  nodemon(config.nodemon)
    .on('log', function handleLogEvent(event) {
      gutil.log(event.colour);
    })
    .on('start', function handleStartEvent() {
      gutil.log('Nodemon reloading page with livereload.');
    })
    .on('exit', function handleExitEvent() {
      gutil.log('Nodemon script exiting.');
    })
    .on('crash', function handleCrash() {
      gutil.log('Nodemon script crashed for some reason');
    });
});
