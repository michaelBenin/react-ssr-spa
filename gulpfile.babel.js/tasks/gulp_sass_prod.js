import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import config from './../configs/config';

gulp.task('sass-prod', function sassProd() {
  const {
    cssDest,
    stylesSrc,
    sassConf,
    autoprefixerBrowsers
  } = config.styles.main;
  return gulp
    .src(stylesSrc)
    .pipe(sass(sassConf).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerBrowsers))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest(cssDest));
});
