import gulp from 'gulp';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { log } from 'gulp-util';
import config from './../configs/webpack.config';

gulp.task('webpack-dev-server', function runWebpackDevServer(callback) {
  const webpackApp = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  });

  /* const server = */ webpackApp.listen(3001, 'localhost',
    function webpackDevServerRunning(err /* , result*/) {
      if (err) {
        log(err);
      }
      log('Webpack dev server listening at localhost:3001');
      callback();
    });

  process.on('SIGINT', () => {
    log('Process interrupted');
    // TODO: fork webpack bc this isn't working!
    // server.close();
    process.exit();
  });
});