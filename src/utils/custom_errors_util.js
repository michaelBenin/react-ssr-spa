// Validation Errors
function ValidationErrors(errors, options, attributes, constraints) {
  Error.captureStackTrace(this, this.constructor);
  this.errors = errors;
  this.options = options;
  this.attributes = attributes;
  this.constraints = constraints;
}
ValidationErrors.prototype = new Error();

export const wrappedValidation = { // eslint-disable-line import/prefer-default-export
  wrapErrors: ValidationErrors
};
