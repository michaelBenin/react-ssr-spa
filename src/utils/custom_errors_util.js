import { createError } from './create_custom_error_util';
import { statuses } from './status_codes_util';
// Validation Errors
export const ValidationError = createError('ValidationError');


// HTTP errors
export const HTTPErrors = Object.keys(statuses).reduce(function setError(obj, key) {
  obj[key] = createError(statuses[key]); // eslint-disable-line no-param-reassign
  return obj;
}, {});
