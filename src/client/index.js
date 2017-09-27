import React from 'react';
import { hydrate, render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import log from './services/logger_service';
import initialize from './utils/initializer_util';
import configureStore from '../redux/store/store';
import initialLoadActionCreator from '../redux/action_creators/initial_load_action_creator';
import Root from '../views/containers/root_container';
import { ThirdPartyJs, loadAllThirdPartyJs } from './utils/third_party_js_util';

const browserHistory = createHistory();
const originalHash = browserHistory.location.hash;
browserHistory.location.hash = '';

initialize().catch(function logError(/* err */) {
  // console.error(err);
});

// get json here
let bootstrappedConfig = {};
let env = false;

try {
  bootstrappedConfig = JSON.parse(
    document.querySelector('.client-config').getAttribute('data-state')
  );
  env = bootstrappedConfig.config.env;
} catch (error) {
  // console.error(error, 'Error parsing client config.');
  bootstrappedConfig = {};
}

browserHistory.location.key = bootstrappedConfig.routing.location.key;

const store = configureStore(browserHistory, bootstrappedConfig, env);

/*
browserHistory.listen((location, action ) => {
  const url = `${location.pathname}`;
  // analytics tracking
});
*/

ThirdPartyJs.setThirdPartyGlobals();

function renderedApp() {
  browserHistory.location.hash = originalHash;
  store.dispatch(initialLoadActionCreator());
  loadAllThirdPartyJs(env);
}

try {
  hydrate(
    <Root store={store} history={browserHistory} />,
    window.document,
    renderedApp
  );
} catch (err) {
  // fire ad code here to still show ads
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
