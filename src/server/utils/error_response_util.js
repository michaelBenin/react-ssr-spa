import { pick, map } from 'lodash';
import log from '../services/logger_service';

function mapErrorList(errorItem) {
  return pick(errorItem, 'message');
}

export default (message, code, errorList) => {
  if (!message || !code) {
    log.fatal('Logger used incorrectly.');
    return {
      error: {
        message: 'Create Error Response used incorrectly.'
      }
    };
  }

  if (errorList) {
    return {
      error: {
        message,
        statusCode: code,
        errors: map(errorList, mapErrorList)
      }
    };
  }

  return {
    error: {
      message,
      statusCode: code
    }
  };
};
