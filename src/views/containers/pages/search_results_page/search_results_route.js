import React from 'react';
import Loadable from 'react-loadable';

let Component = false;

if (process.env.RUNTIME_ENV !== 'browser') {
  // eslint-disable-next-line global-require
  Component = require('./search_results_page').default;
}

const routeConfig = {
  path: '/search/:query',
  component() {
    if (Component) {
      return <Component />;
    }
    return <LazyComponent />;
  },
  loadData: Component ? Component.loadData : () => {},
  preloadChunk() {
    return import(/* webpackChunkName: "search" */ './search_results_page').then(
      resp => {
        Component = resp.default;
        routeConfig.loadData = Component.loadData;
        return Component;
      }
    );
  },
  chunk: 'search'
};

const LazyComponent = Loadable({
  loader() {
    return routeConfig.preloadChunk();
  },
  loading() {
    return (
      <section key="search" className="search">
        <h1>Be Patient, we are loading in the search results.</h1>
      </section>
    );
  }
});

export default routeConfig;
