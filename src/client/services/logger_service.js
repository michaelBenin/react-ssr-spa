// TODO: Add configuration based logging for different envs
// import config from './config_service';

// todo, configure to use axios
import axios from 'axios';

/**
 * Send log request to site.
 * @param {string} level The log level.
 * @param {Object} data The log data.
 * @param {string} message The log message.
 * @private
 * @returns {Promise}
 */
function log(level, data, message) {
  return axios({
    url: '/api/v1/log',
    type: 'POST',
    dataType: 'json',
    data: {
      level,
      data: JSON.stringify(data),
      message
    }
  });
  /* TODO: Uncomment when we have analytics
 .then(function loggerResponse(response) {
 // Track response with analytics
 // response.code
 }).catch(function loggerErrorResponse(error) {
 // Track response with analytics
 // error.code
 });
 */
}

/**
 * Factory to create log methods.
 * @param {string} level The log level method name.
 * @private
 * @returns {function}
 */
function createLogFn(level) {
  return function logFn(data, message) {
    if (!data && !message) {
      // console error if in development
      return false;
    }
    if (typeof data === 'string') {
      return log(level, {}, data);
    }
    return log(level, data, message);
  };
}

/**
 * Send log request to server side.
 * @typedef {function} logMethod
 * @param {Object|string} data The log data or message.
 * @param {string=} message The log message if the log data was specified.
 * @returns {Promise}
 */

/**
 * Methods: trace, debug, info, warn, error, fatal.
 *
 * See methods API: https://github.com/trentm/node-bunyan#log-method-api
 *
 * @example
 *   var log = require('./services/logger');
 *   log.error({ stack: err.stack }, 'Descriptive Error message' );
 *
 * @module services/logger
 */
export default {
  /**
   * @name module:services/logger.trace
   * @type {logMethod}
   */
  trace: createLogFn('trace'),

  /**
   * @name module:services/logger.debug
   * @type {logMethod}
   */
  debug: createLogFn('debug'),

  /**
   * @name module:services/logger.info
   * @type {logMethod}
   */
  info: createLogFn('info'),

  /**
   * @name module:services/logger.warn
   * @type {logMethod}
   */
  warn: createLogFn('warn'),

  /**
   * @name module:services/logger.error
   * @type {logMethod}
   */
  error: createLogFn('error'),

  /**
   * @name module:services/logger.fatal
   * @type {logMethod}
   */
  fatal: createLogFn('fatal')
};
