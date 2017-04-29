import P from 'bluebird';
import log from '../services/logger_service';
import '../../utils/custom_validations_util';
import redis from '../services/redis_service';
import config from '../config';

const bootPromises = [];

log.info('booting initializer');

if (config.get('cacheEnabled')) {
  const redisReady = new P(function redisReadyPromise(resolve, reject) {
    function handleRedisError(error) {
      reject(error);
    }

    redis.on('error', handleRedisError);
    redis.on('ready', function handleRedisReady() {
      log.info('Redis connection successful.');
      log.info('Socket.io redis connection successful.');
      resolve(true);
    });
  });
  bootPromises.push(redisReady);
}

export default P.all(bootPromises);
