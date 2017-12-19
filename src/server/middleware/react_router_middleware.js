import P from 'bluebird';
import React from 'react';
import createMemoryHistory from 'history/createMemoryHistory';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';
import { existsSync } from 'fs';
import path from 'path';
import serialize from 'serialize-javascript';
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
const staticVendorUrl = config.get('staticVendorUrl');
const staticBundleUrl = config.get('staticBundleUrl');
const cacheExpire = 60 * 6;

const manifestPath = path.join(
  __dirname,
  '../../../dist/static/js/manifest.json'
);

let manifestJSON = {};

if (env === 'production' || env === 'test') {
  if (existsSync(manifestPath)) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    manifestJSON = require(manifestPath);
  } else {
    log.fatal(`Manifest file not found in middleware: ${manifestPath}`);
  }
}

export default (req, res) => {
  const htmlKey = `${req.url}:__html`;
  const statusKey = `${req.url}:__status`;

  function returnFromApi() {
    const memoryHistory = createMemoryHistory({ initialEntries: [req.url] });
    const branch = matchRoutes(routes, req.path);

    const chunks = branch.reduce(function matchMap(list, { route }) {
      if (route.chunk) {
        list.push(route.chunk);
      }
      return list;
    }, []);

    // Unexpected keys will be ignored.
    const store = configureStore(memoryHistory, {
      config: {
        env,
        chunks,
        staticUrl,
        staticVendorUrl,
        staticBundleUrl,
        manifestJSON,
        apiUrl,
        initialPageLoad: true,
        featureFlags,
        initialQueryParams: serialize(req.query, { isJSON: true }),
        navHistory: [`${req.protocol}://${req.hostname}${req.originalUrl}`]
      }
    });

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
