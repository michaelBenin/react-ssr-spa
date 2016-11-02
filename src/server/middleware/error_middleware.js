import config from '../config';
import gracefulExit from '../utils/graceful_exit_util';
import log from '../services/logger_service';

export default (err, req, res) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    // handle CSRF token errors here
    res.status(403);
    return res.send('Form tampered with.');
  }
  log.fatal(err,
    `Error on request: method: ${req.method},
      url: ${req.url}`
  );
  // Check for dev here etc..
  // todo: email/alert dev team
  if (config.env === 'development') {
    res.status(500).json({
      message: err.message,
      error: err.stack
    });
  }
  res.status(500).send('Internal Error Occured.');
  return gracefulExit(err);
};
