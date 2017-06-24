// import config from '../config';
// import nodemailer from 'nodemailer';
import gracefulExit from 'express-graceful-exit';
import log from '../services/logger_service';
import { app, createOrGetServer } from '../services/express_service';
import redisClient from '../services/redis_service';
import config from '../config';

export default (err, silent) => {
  const exitCode = err ? 1 : 0;
  if (err) {
    log.info(`Process exiting because of error: ${err.message}`);
    log.fatal(
      err.stack,
      `${err.message} - commit: ${process.env
        .GIT_COMMIT}, Build Number: ${process.env.BUILD_NUMBER}`
    );
  } else {
    log.info('Exiting without error.');
  }

  if (silent) {
    return createOrGetServer().close();
  }

  function gracefulExitCallback() {
    if (config.get('cacheEnabled')) {
      if (redisClient && redisClient.quit) {
        redisClient.quit();
        return process.exit(exitCode);
      }
    }
    return process.exit(exitCode);
  }

  return gracefulExit.gracefulExitHandler(app, createOrGetServer(), {
    log: true,
    logger(data) {
      return log.info(data);
    },
    suicideTimeout: 3 * 1000, // pm2 waits 4 seconds
    exitProcess: false,
    force: true,
    callback: gracefulExitCallback
  });
};
