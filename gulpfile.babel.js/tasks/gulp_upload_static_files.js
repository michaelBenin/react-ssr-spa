import awspublish from 'gulp-awspublish';
import gulp from 'gulp';
import rename from 'gulp-rename';

const sha = process.env.GIT_COMMIT;

gulp.task('upload-static-files', function publishAWS() {
  const publisher = awspublish.create({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    params: {
      Bucket: 'react-ssr-spa-static'
    }
  });

  const headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('./dist/static/**/*')
    .pipe(rename(function renamePlugin(path) {
      path.dirname = `/${sha}/${path.dirname}`; // eslint-disable-line no-param-reassign
      return path;
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

