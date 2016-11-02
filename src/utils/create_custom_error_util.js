import { extend } from 'lodash';

export default function createError(name) {
  const fn = function errorCreate(message, conf) {
    this.message = message || 'No message provided.';
    this.name = name;
    if (conf) {
      extend(this, conf);
    }
    Error.captureStackTrace(this, this.constructor);
  };
  fn.prototype = Object.create(Error.prototype);
  fn.prototype.constructor = fn;
  return fn;
}
