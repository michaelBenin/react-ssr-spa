import path from 'path';
import _ from 'lodash';
import base from './base';

/**
 * Configuration module which allows a centralized location for retrieving config properties.
 * @module config
 */
// Defaults configuration to development if not provided
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const env =
  process.env.NODE_ENV === 'coverage' ? 'development' : process.env.NODE_ENV;
const configPath = path.join(__dirname, env);

const envConfig = require(configPath); // eslint-disable-line  import/no-dynamic-require
const configuration = _.defaultsDeep(
  {
    env
  },
  envConfig.default,
  base
);

class Config {
  static get(property) {
    return _.get(configuration, property);
  }

  static set(property, value) {
    return _.set(configuration, property, value);
  }
}

export default Config;
