import gulp from 'gulp';
import stylelint from 'gulp-stylelint';
import path from 'path';
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
