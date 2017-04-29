import { get as _get, extend } from 'lodash';
import log from '../services/logger_service';

// Same levels provided by Bunyan
const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

/**
 * Logging controller
 * @module controllers/log
 */

/**
 * Middleware for request logger.
 *
 * @name module:controllers/log.log
 * @type {middleware}
 */
const loggerController = (req, res) => {
  const level = _get(req, 'body.level');
  let message = _get(req, 'body.message');
  let data = _get(req, 'body.data');
  const validLevel = levels.indexOf(level) > -1;

  if (validLevel) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      log.error(
        {
          req: req.url
        },
        'Bad json passed from browser log.'
      );
      data = data || {
        data: 'Bad json passed from browser.'
      };
    }

    message = message || 'Message not provided.';

    extend(data, {
      endpoint: 'browserIW'
    });

    log[level](data, message);
    res.status(200).json({
      status: 200
    });
    return false;
  }

  if (!validLevel) {
    const failedLogMessage = 'Log attempted with unsupported method.';
    log.warn(
      {
        req: req.url
      },
      failedLogMessage
    );

    res.status(405).json({
      status: 405,
      message: failedLogMessage
    });

    return false;
  }

  const unknownFailureMessage = 'Browser log failed for unknown reasons.';

  log.error(
    {
      req: req.url
    },
    unknownFailureMessage
  );

  res.status(503).json({
    status: 503,
    message: unknownFailureMessage
  });

  return false;
};

export default loggerController;
