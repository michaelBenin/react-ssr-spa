import { promisifyAll } from 'bluebird';
import redis from 'redis';
import config from '../config';
// import hiredis from 'hiredis'
let redisClient = function redisClient() {}; // eslint-disable-line import/no-mutable-exports

if (config.get('cacheEnabled')) {
  promisifyAll(redis.RedisClient.prototype);
  promisifyAll(redis.Multi.prototype);
  redisClient = redis.createClient(config.get('redis'));
}

export default redisClient;
