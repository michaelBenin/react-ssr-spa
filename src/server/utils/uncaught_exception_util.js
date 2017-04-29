import gracefulExit from '../utils/graceful_exit_util';
import log from '../services/logger_service';

process.once('uncaughtException', function handleUncaughtException(err) {
  log.info('Process event: uncaughtException');
  gracefulExit(err);
});

process.once('SIGTERM', function handleSIGTERM(err) {
  log.info('Process event: SIGTERM');
  gracefulExit(err);
});

process.once('SIGINT', function handleSIGINT(err) {
  log.info('Process event: SIGINT');
  gracefulExit(err);
});

process.on('message', function handleMessage(message) {
  log.info(`Process event: message=${message}`);
  if (message === 'shutdown') {
    gracefulExit();
  }
});

process.on('unhandledRejection', function handleRejection(reason, p) {
  log.error(`Unhandled Rejection at: Promise , ${p}`, ` reason: ${reason}`);
});
