import path from 'path';
import _ from 'lodash';
import base from './base';
// import log from '../services/logger_service';

/**
 * Configuration module which allows a centralized location for retrieving config properties.
 * @module config
 */
// Defaults configuration to development if not provided
if (!process.env.NODE_ENV) {
  // console.warn('Environment defaulting to development.');
  process.env.NODE_ENV = 'development';
}
const env = process.env.NODE_ENV;
const configPath = path.join(__dirname, env);

const envConfig = require(configPath); // eslint-disable-line  import/no-dynamic-require
const configuration = _.defaultsDeep(
  {
    env: process.env.NODE_ENV
  },
  envConfig.default,
  base
);

// console.info(`NODE_ENV set to ${configuration.env}`);

class Config {

  constructor(config) {
    this.config = config;
  }

  get(property) {
    const prop = _.get(this.config, property);
    if (!prop) {
      // console.warn(`Property ${property} is undefined.`);
    }
    return prop;
  }

  set(property, value) {
    return _.set(this.config, property, value);
  }

}

export default new Config(configuration);
