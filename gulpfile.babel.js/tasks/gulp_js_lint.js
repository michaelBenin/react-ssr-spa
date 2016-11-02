import eslint from 'gulp-eslint';
import gulp from 'gulp';
import path from 'path';
import { cloneDeep } from 'lodash';
import gulpIf from 'gulp-if';
import config from '../configs/config';

const configFilePath = path.join(__dirname, './../configs/.eslintrc');
const conf = {
  useEslintrc: false,
  configFile: configFilePath,
  rules: config.eslint.conf.rules
};

function isFixed(file) {
  return file.eslint !== null && file.eslint.fixed;
}

gulp.task('js-lint-src', function lintSrc() {
  return gulp.src('src/**/*.js')
    .pipe(eslint(conf))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js-lint-gulp', function lintGulp() {
  const gulpConf = cloneDeep(conf);
  gulpConf.rules['import/no-extraneous-dependencies'] = 0;
  return gulp.src('gulpfile.babel.js/**/*.js')
    .pipe(eslint(gulpConf))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js-lint-test', function lintTests() {
  const baseConfig = cloneDeep(config.eslint.conf);
  baseConfig.rules['prefer-arrow-callback'] = 0;
  baseConfig.rules['func-names'] = 0;
  baseConfig.rules['import/no-extraneous-dependencies'] = 0;
  return gulp.src('test/**/*.js')
    .pipe(eslint({
      useEslintrc: false,
      configFile: configFilePath,
      rules: baseConfig.rules
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js-lint',
  ['js-lint-src', 'js-lint-gulp', 'js-lint-test'],
  function jslint(cb) {
    cb();
  });

gulp.task('js-lint-src-fix', function lintSrc() {
  const confFix = cloneDeep(conf);
  confFix.fix = true;
  return gulp.src('src/**/*.js')
    .pipe(eslint(confFix))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('src')));
});

gulp.task('js-lint-gulp-fix', function lintGulp() {
  const confFix = cloneDeep(conf);
  confFix.fix = true;
  confFix.rules['import/no-extraneous-dependencies'] = 0;
  return gulp.src('gulpfile.babel.js/**/*.js')
    .pipe(eslint(confFix))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('gulpfile.babel.js')));
});

gulp.task('js-lint-test-fix', function lintTests() {
  const baseConfig = cloneDeep(config.eslint.conf);
  baseConfig.rules['prefer-arrow-callback'] = 0;
  baseConfig.rules['func-names'] = 0;
  baseConfig.rules['import/no-extraneous-dependencies'] = 0;
  return gulp.src('test/**/*.js')
    .pipe(eslint({
      fix: true,
      useEslintrc: false,
      configFile: configFilePath,
      rules: baseConfig.rules
    }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('test')));
});

gulp.task('js-lint-fix',
  ['js-lint-src-fix', 'js-lint-gulp-fix', 'js-lint-test-fix'],
  function jslint(cb) {
    cb();
  });
