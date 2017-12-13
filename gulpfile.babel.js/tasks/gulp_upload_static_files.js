import awspublish from 'gulp-awspublish';
import gulp from 'gulp';
import rename from 'gulp-rename';
import { join } from 'path';
import { log } from 'gulp-util';
import { existsSync } from 'fs';

const bundle = process.env.STATIC_BUNDLE_URL;
const vendor = process.env.STATIC_VENDOR_URL;

const manifestPath = join(__dirname, '../../dist/static/js/manifest.json');

let manifestJSON = false;

gulp.task('upload-static-files', function publishAWS() {
  const publisher = awspublish.create({
    region: 'us-east-1',
    params: {
      Bucket: process.env.s3bucket
    }
  });

  const headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp
    .src('./dist/static/**/*')
    .pipe(
      rename(function renamePlugin(path) {
        path.dirname = `/${bundle}/${path.dirname}`; // eslint-disable-line no-param-reassign
        return path;
      })
    )
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

gulp.task('upload-vendor-file', function publishAWS() {
  if (existsSync(manifestPath)) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    manifestJSON = require(manifestPath);
  } else {
    log(`Manifest file not found: ${manifestPath}`);
    throw new Error(`Manifest file not found: ${manifestPath}`);
  }

  const publisher = awspublish.create({
    region: 'us-east-1',
    params: {
      Bucket: process.env.s3bucket
    }
  });

  const headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp
    .src([
      `./dist/static/js/${manifestJSON['vendor.js']}`,
      `./dist/static/js/${manifestJSON['vendor.js.map']}`
    ])
    .pipe(
      rename(function renamePlugin(path) {
        path.dirname = `/${vendor}/${path.dirname}`; // eslint-disable-line no-param-reassign
        return path;
      })
    )
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});
