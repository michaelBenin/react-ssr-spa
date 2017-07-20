import $ from 'jquery';
import React from 'react';
import P from 'bluebird';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { matchRoutes } from 'react-router-config';
import log from './services/logger_service';
import reactGuardUtil from '../utils/react_guard_util';
import initialize from './utils/initializer_util';
import configureStore from '../redux/store/store';
import getRoutesWithStore from '../react_router/react_router';
import initialLoadActionCreator from '../redux/action_creators/initial_load_action_creator';
import Root from '../views/containers/root_container';
import { ThirdPartyJs, loadAllThirdPartyJs } from './utils/third_party_js_util';

const browserHistory = createHistory();
const originalHash = browserHistory.location.hash;
browserHistory.location.hash = '';

initialize().catch(
  function logError(/* err */) {
    // console.error(err);
  }
);

// get json here
let bootstrappedConfig = {};
let env = false;
const $config = $('.client-config');
try {
  bootstrappedConfig = $config.data('state');
  env = bootstrappedConfig.config.env;
} catch (error) {
  // console.error(error, 'Error parsing client config.');
  bootstrappedConfig = {};
}

reactGuardUtil(env);

browserHistory.location.key = bootstrappedConfig.routing.location.key;

const store = configureStore(browserHistory, bootstrappedConfig, env);

const routesToMatch = getRoutesWithStore(store);

browserHistory.listen((location /* , action*/) => {
  const url = `${location.pathname}`;
  const branch = matchRoutes(routesToMatch, url);
  branch.map(function matchMap({ route, match }) {
    return route.loadData ? route.loadData(match) : P.resolve(null);
  });
});

ThirdPartyJs.setThirdPartyGlobals();

function renderedApp() {
  browserHistory.location.hash = originalHash;
  store.dispatch(initialLoadActionCreator());
  loadAllThirdPartyJs(env);
}

try {
  render(
    <Root store={store} history={browserHistory} />,
    window.document,
    renderedApp
  );
} catch (err) {
  log.fatal(`Unable to render app: ${err.message}`, err.stack);
}

if (module.hot) {
  module.hot.accept(
    ['../react_router/react_router', '../views/containers/root_container'],
    () => {
      const HotLoadRoot = require('../views/containers/root_container').default; // eslint-disable-line global-require
      render(
        <HotLoadRoot store={store} history={browserHistory} />,
        window.document
      );
    }
  );
}
