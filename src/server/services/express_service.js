import path from 'path';
import http from 'http';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import hpp from 'hpp'; // Used in conjunction with urlencoded.
import expressGracefulExit from 'express-graceful-exit';
import expressBunyanLogger from 'express-bunyan-logger';
import responseTime from 'response-time';
import helmet from 'helmet';
import contentValidator from 'express-content-length-validator';
import config from '../config';
import router from './router_service';

import reactRouterMiddleware from '../middleware/react_router_middleware';

const env = config.get('env');

/**
 * Concurrent sockets the agent can have open per origin.
 * Defaults to Infinity. {@link http://nodejs.org/api/http.html#http_agent_maxsockets More Info}
 * @type {number}
 */
https.globalAgent.maxSockets = 1000;
http.globalAgent.maxSockets = 1000;

const MAX_CONTENT_LENGTH_ACCEPTED = 9999;

export const app = express();

app.use(responseTime());
app.disable('x-powered-by');

// TODO: configure for specific routes
app.use(helmet());

// TODO: configure for specific routes
app.use(contentValidator.validateMax({
  max: MAX_CONTENT_LENGTH_ACCEPTED,
  status: 400,
  message: 'Exceeds Max Content.'
}));

app.use(expressGracefulExit.middleware(app));

// TODO: configure for specific routes
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

// USED WITH BODY PARSER
// TODO: configure for specific routes
app.use(hpp());

if (env === 'development') {
  app.use(express.static(path.join(__dirname, '../../static')));
}

app.use('/', router);
app.use(expressBunyanLogger(config.get('logMiddleware')));
app.use(reactRouterMiddleware);

let server = false;

export const createOrGetServer = () => {
  if (!server) {
    server = http.createServer(app);
    expressGracefulExit.init(server);
  }
  return server;
};

export const setServer = (runningServer) => {
  server = runningServer;
};

