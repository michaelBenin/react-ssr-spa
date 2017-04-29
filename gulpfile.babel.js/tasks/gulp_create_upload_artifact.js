import aws from 'gulp-aws';
import tar from 'gulp-tar';
import gzip from 'gulp-gzip';
import gulp from 'gulp';

gulp.task('create-upload-artifact', function compactS3Upload() {
  return gulp
    .src('./**/*', {
      buffer: false,
      dot: true
    })
    .pipe(tar(`${process.env.GIT_COMMIT}.tar`))
    .pipe(gzip())
    .pipe(gulp.dest(`./${process.env.GIT_COMMIT}`))
    .pipe(
      aws.s3('react-ssr-spa-artifacts/artifacts', {
        aws_cli_path: '/usr/bin/aws',
        aws_region: 'us-east-1',
        aws_key: process.env.AWS_ACCESS_KEY_ID,
        aws_secret: process.env.AWS_SECRET_ACCESS_KEY
      })
    );
});
