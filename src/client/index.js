// https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
// https://github.com/reactjs/react-router-redux/blob/master/examples/server/client.js
import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { match, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore } from '../redux/store/store';
import getRoutes from '../react_router/react_router';
import initialize from './utils/initializer_util';
import initialLoadActionCreator from '../redux/action_creators/initial_load_action_creator';
import Root from '../views/containers/root_container';
import { ThirdPartyJs, loadAllThirdPartyJs } from './utils/third_party_js_util';

initialize().catch(function logError(/* err */) {
  // console.error(err);
});
// get json here
let bootstrappedConfig = {};
let env = false;
const $config = $('.client-config');
try {
  bootstrappedConfig = JSON.parse($config.html());
  env = bootstrappedConfig.config.env;
  if (env === 'development') {
    window.disqus_developer = 1;
  }
} catch (error) {
  // console.error(error, 'Error parsing client config.');
  bootstrappedConfig = {};
}
const store = configureStore(browserHistory, bootstrappedConfig, env);
const history = syncHistoryWithStore(browserHistory, store);
const routes = getRoutes(history, store);
ThirdPartyJs.setThirdPartyGlobals();

match({
  history,
  routes
}, (error  /* , redirectLocation, renderProps*/) => {
  if (error) {
    // handle error here
  }

  function renderedApp() {
    store.dispatch(initialLoadActionCreator());
    loadAllThirdPartyJs(env);
  }

  render(
    <Root store={store}>{routes}</Root>,
    window.document,
    renderedApp
  );
});

if (module.hot) {
  module.hot.accept(() => {
    const HotLoadRoot = require('../views/containers/root_container'); // eslint-disable-line global-require
    render(
      <HotLoadRoot />,
      window.document
    );
  });
}
