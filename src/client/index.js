import React from 'react';
import { hydrate, render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import scriptJS from 'scriptjs';
import get from 'lodash/get';
import log from './services/logger_service';
import initialize from './utils/initializer_util';
import configureStore from '../redux/store/store';
import initialLoadActionCreator from '../redux/action_creators/initial_load_action_creator';
import Root from '../views/containers/root_container';
import { ThirdPartyJs, loadAllThirdPartyJs } from './utils/third_party_js_util';

initialize().catch(function logError(err) {
  log.error(err);
});

window.startApp = config => {
  function bootReact() {
    const browserHistory = createHistory();
    const originalHash = browserHistory.location.hash;
    browserHistory.location.hash = '';

    const env = get(config, 'config.env');
    browserHistory.location.key = config.routing.location.key;
    const store = configureStore(browserHistory, config, env);
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
      document.documentElement.className +=
        document.documentElement.className === '' ? 'hydrated' : ' hydrated';
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
          // eslint-disable-next-line global-require
          const HotLoadRoot = require('../views/containers/root_container')
            .default;
          render(
            <HotLoadRoot store={store} history={browserHistory} />,
            window.document
          );
        }
      );
    }
  }

  const img = document.createElement('img');
  const supportSrcset = 'srcset' in img && 'sizes' in img;

  if (
    !window.Map ||
    !window.Set ||
    !window.requestAnimationFrame ||
    !supportSrcset
  ) {
    scriptJS(
      [
        'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js',
        'https://cdn.jsdelivr.net/picturefill/3.0.3/picturefill.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/dom4/1.8.3/dom4.js'
      ],
      bootReact
    );
  } else {
    bootReact();
  }
};
