import React from 'react';
import Loadable from 'react-loadable';
import searchResultsStateManager from './search_results_data_fetch';

let CachedComponent = false;

const LazySearchResultsPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "search" */ './search_results_page').then(
      resp => {
        CachedComponent = resp.default;
        return CachedComponent;
      }
    ),
  loading() {
    return (
      <section key="search" className="search">
        <h1>Be Patient, we are loading in the search results.</h1>
      </section>
    );
  }
});

export default {
  path: '/search/:query',
  component: () => {
    if (process.env.RUNTIME_ENV !== 'browser') {
      // eslint-disable-next-line global-require
      const SearchResultsPage = require('./search_results_page').default;
      return <SearchResultsPage />;
    }
    if (CachedComponent) {
      return <CachedComponent />;
    }
    return <LazySearchResultsPage />;
  },
  loadData: searchResultsStateManager,
  preloadChunk() {
    return import(/* webpackChunkName: "search" */ './search_results_page').then(
      resp => {
        CachedComponent = resp.default;
        return CachedComponent;
      }
    );
  },
  chunk: 'search'
};
