// Validation Errors
function ValidationErrors(errors, options, attributes, constraints) {
  Error.captureStackTrace(this, this.constructor);
  this.errors = errors;
  this.options = options;
  this.attributes = attributes;
  this.constraints = constraints;
}
ValidationErrors.prototype = new Error();

// eslint-disable-next-line import/prefer-default-export
export const wrappedValidation = {
  wrapErrors: ValidationErrors
};
