import { canUseDOM } from 'exenv';

let serverLog = false;
let clientLog = false;

if (process.env.RUNTIME_ENV !== 'browser') {
  serverLog = require('../server/services/logger_service'); // eslint-disable-line global-require
} else {
  clientLog = require('../client/services/logger_service'); // eslint-disable-line global-require
}

const log = canUseDOM ? clientLog : serverLog;

module.exports = log;
