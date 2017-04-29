import P from 'bluebird';
import validator from 'validator';
import validate from 'validate.js';

validate.Promise = P;

function validateUuid(str) {
  return validator.isUUID(str, 4);
}

// http://validatejs.org/#custom-validator
validate.validators.uuidv4 = function uuidv4(
  value,
  options,
  key /* , attributes */
) {
  if (validateUuid(value) === true) {
    return null;
  }
  return `${key} is not a valid uuid version 4.`;
};

export default validate;

// Example: // http://stackoverflow.com/questions/29121733/validate-js-promises-on-custom-validation
