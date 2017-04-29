import gulp from 'gulp';
import stylelint from 'gulp-stylelint';
import stylefmt from 'gulp-stylefmt';
import path from 'path';
import { clone } from 'lodash';
import config from '../configs/config';

const configFilePath = path.join(__dirname, './../configs/.stylelintrc');

gulp.task('style-lint', function lintSass() {
  return gulp.src(config.stylelint.src).pipe(
    stylelint({
      configFile: configFilePath,
      reporters: [
        {
          formatter: 'string',
          console: true
        }
      ],
      failAfterError: true
    })
  );
});

gulp.task('style-lint-fix', function styleLintFix() {
  // stylelint fix has issues with our main file
  // this project is still in progress
  // TODO: open an issue on stylefmt with this example
  const src = clone(config.stylelint.src);
  src.push('!./src/client/styles/main.scss');
  return gulp
    .src(src)
    .pipe(
      stylefmt({
        config: configFilePath
      })
    )
    .pipe(gulp.dest('src'));
});
