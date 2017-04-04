import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import configureStore from '../redux/store/store';
import initialize from './utils/initializer_util';
import initialLoadActionCreator from '../redux/action_creators/initial_load_action_creator';
import Root from '../views/containers/root_container';
import { ThirdPartyJs, loadAllThirdPartyJs } from './utils/third_party_js_util';

const browserHistory = createHistory();

initialize().catch(function logError(/* err */) {
  // console.error(err);
});
// get json here
let bootstrappedConfig = {};
let env = false;
const $config = $('.client-config');
try {
  bootstrappedConfig = $config.data('state');
  env = bootstrappedConfig.config.env;
  if (env === 'development') {
    window.disqus_developer = 1;
  }
} catch (error) {
  // console.error(error, 'Error parsing client config.');
  bootstrappedConfig = {};
}

browserHistory.location.key = bootstrappedConfig.routing.location.key;

const store = configureStore(browserHistory, bootstrappedConfig, env);

ThirdPartyJs.setThirdPartyGlobals();

function renderedApp() {
  store.dispatch(initialLoadActionCreator());
  loadAllThirdPartyJs(env);
}

render(
  <Root store={store} history={browserHistory} />,
  window.document,
  renderedApp
);

if (module.hot) {
  module.hot.accept(() => {
    const HotLoadRoot = require('../views/containers/root_container'); // eslint-disable-line global-require
    render(
      <HotLoadRoot />,
      window.document
    );
  });
}
