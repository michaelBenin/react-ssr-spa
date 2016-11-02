import './utils/install_sourcemap_util';
import config from './config';
import { app, createOrGetServer, setServer } from './services/server_service';
import errorMiddleware from './middleware/error_middleware';
import log from './services/logger_service';
import initialize from './utils/initializer_util';
import doGracefulExit from './utils/graceful_exit_util';
import './utils/uncaught_exception_util';

process.send = process.send || (() => {
});
const port = config.get('port');
app.use(errorMiddleware);

const startServer = () => {
  const server = createOrGetServer().listen(port, () => {
    log.info({
      port
    }, 'Server is running.');
  });
  process.send('online');
  setServer(server);
};

const serverError = (err) => {
  log.fatal(err, err.message);
  doGracefulExit(err);
};

log.info('Server is booting.');
export default initialize
  .then(startServer)
  .catch(serverError);
