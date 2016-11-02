import P from 'bluebird';
import React from 'react';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { renderToString } from 'react-dom/server';

import redisClient from '../services/redis_service';
import log from '../services/logger_service';
import getRoutes from '../../react_router/react_router';
import { configureStore } from '../../redux/store/store';
import Root from '../../views/containers/root_container';
import config from '../config';

const env = config.get('env');
const staticUrl = config.get('staticUrl');
const apiUrl = config.get('apiUrl');
const cacheEnabled = config.get('cacheEnabled');
const cacheExpire = 60 * 6; // 6 hours to start
// refactor to use https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md

// https://github.com/reactjs/react-router-redux/tree/master/examples/server
export default (req, res) => {
  const htmlKey = `${req.url}:__html`;
  const statusKey = `${req.url}:__status`;

  function returnFromApi() {
    const memoryHistory = createMemoryHistory(req.url);
    // Unexpected keys will be ignored.
    const store = configureStore(memoryHistory, {
      config: {
        env,
        staticUrl,
        apiUrl,
        initialPageLoad: true
      }
    });

    const history = syncHistoryWithStore(memoryHistory, store);
    const routes = getRoutes(history, store);

    return match({
      history,
      routes,
      location: req.url
    }, function matchCallback(error, redirectLocation, renderProps) {
      if (redirectLocation) {
        return res.status(301)
          .redirect(redirectLocation.pathname + (redirectLocation.search || ''));
      }

      let status;

      status = store.getState().status.code;

      if (error) {
        log.error(error);
        status = 500;
      }


      const renderedDOM = `<!doctype>${renderToString(
        <Root store={store}><RouterContext {...renderProps} /></Root>
      )}`;

      // TODO: cache rendered dom in redis
      res.writeHead(status, {
        'Content-Type': 'text/html'
      });

      res.end(renderedDOM);
      if (config.get('cacheEnabled')) {
        redisClient.set(htmlKey, renderedDOM);
        redisClient.set(statusKey, status);
        redisClient.EXPIRE(htmlKey, cacheExpire); // eslint-disable-line new-cap
        redisClient.EXPIRE(statusKey, cacheExpire); // eslint-disable-line new-cap
      }
      return false;
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
    }).catch(returnFromApi);
};
