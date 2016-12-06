// import config from '../config';
// import nodemailer from 'nodemailer';
import gracefulExit from 'express-graceful-exit';
import log from '../services/logger_service';
import { app, createOrGetServer } from '../services/server_service';
import redisClient from '../services/redis_service';
import config from '../config';
// const env = config.get('env');
// const transport = nodemailer.createTransport('SMTP', config.get('errorEmail'));

export default (err, silent) => {
  if (err) {
    log.info(`Process exiting because of error: ${err.message}`);
    log.fatal(err.stack, err.message);
  } else {
    log.info('Exiting without error.');
  }

  log.info('Closed connections.');

  if (config.get('cacheEnabled')) {
    redisClient.quit();
  }

  if (silent) {
    return createOrGetServer().close();
  }

  return gracefulExit.gracefulExitHandler(app, createOrGetServer());
};
