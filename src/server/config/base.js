import PrettyStream from 'bunyan-prettystream'; // eslint-disable-line  import/no-extraneous-dependencies
import '../utils/load_env_var_util';
import featureFlags from '../../../features_flags';

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

const {
  // CI,
  // AWS_ACCESS_KEY_ID,
  // AWS_SECRET_ACCESS_KEY,
  GIT_COMMIT,
  REDIS_PORT,
  REDIS_HOST,
  STATIC_URL
} = process.env;

export default {
  featureFlags,
  cacheEnabled: false,
  redis: {
    port: REDIS_PORT,
    host: REDIS_HOST
  },
  port: 8001,
  logMiddleware: {
    streams: [
      {
        path: 'logs/express-middleware-development.log'
      }
    ]
  },
  bunyanLogger: {
    name: 'react-ssr-spa',
    streams: [{
      level: 'debug',
      type: 'raw',
      stream: prettyStdOut
    }]
  },
  gitCommit: GIT_COMMIT,
  pm2WebInterface: '127.0.0.1:9615',
  websocket: 'ws://127.0.0.1:3000',
  websocketPort: 3000,
  staticUrl: `${STATIC_URL}/${GIT_COMMIT}`,
  apiUrl: 'api.github.com', // '127.0.0.1:8000'
  host: '127.0.0.1:8001',
  protocol: 'http://'
};
