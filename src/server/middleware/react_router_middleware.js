import P from 'bluebird';
import React from 'react';
import createMemoryHistory from 'history/createMemoryHistory';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';
import redisClient from '../services/redis_service';
import log from '../services/logger_service';
import routes from '../../react_router/react_router';
import configureStore from '../../redux/store/store';
import Root from '../../views/containers/root_container';
import config from '../config';

const featureFlags = config.get('featureFlags');
const env = config.get('env');
const staticUrl = config.get('staticUrl');
const apiUrl = config.get('apiUrl');
const cacheEnabled = config.get('cacheEnabled');
const cacheExpire = 60 * 6;

export default (req, res) => {
  const htmlKey = `${req.url}:__html`;
  const statusKey = `${req.url}:__status`;

  function returnFromApi() {
    const memoryHistory = createMemoryHistory({ initialEntries: [req.url] });
    // Unexpected keys will be ignored.
    const store = configureStore(memoryHistory, {
      config: {
        env,
        staticUrl,
        apiUrl,
        initialPageLoad: true,
        featureFlags
      }
    });

    const branch = matchRoutes(routes, req.path);

    const promises = branch.map(function matchMap({ route, match }) {
      return route.loadData
        ? route.loadData(match, store.dispatch, store.getState())
        : P.resolve(null);
    });

    P.all(promises)
      .then(function hydrateStoreSuccess() {
        const status = store.getState().status.code;

        const renderedDOM = `<!DOCTYPE html>${renderToString(
          <Root store={store} history={memoryHistory} />
        )}`;

        // TODO: cache rendered dom in redis
        res.writeHead(status, {
          'Content-Type': 'text/html',
          'Access-Control-Allow-Origin': '*'
        });

        res.end(renderedDOM);
        if (config.get('cacheEnabled')) {
          redisClient.setex(htmlKey, cacheExpire, renderedDOM);
          redisClient.setex(statusKey, cacheExpire, status);
        }
        return false;
      })
      .catch(err => {
        log.error(err);
        res.status(500).json(err);
      });
  }

  if (!config.get('cacheEnabled')) {
    return returnFromApi();
  }

  const redisHtml = redisClient.getAsync(htmlKey);
  const redisStatus = redisClient.getAsync(statusKey);

  return P.all([redisStatus, redisHtml])
    .then(function returnFromCache(cacheResponse) {
      if (!cacheEnabled) {
        throw new Error('Cache disabled.');
      }

      if (!cacheResponse[0] || !cacheResponse[1]) {
        throw new Error('Not in cache');
      }
      res.writeHead(cacheResponse[0], {
        'Content-Type': 'text/html'
      });
      return res.end(cacheResponse[1]);
    })
    .catch(returnFromApi);
};
