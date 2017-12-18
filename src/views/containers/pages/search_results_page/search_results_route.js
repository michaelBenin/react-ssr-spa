import React from 'react';
import Loadable from 'react-loadable';

const LazySearchResultsPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "search" */ './search_results_page').then(
      resp => resp.default
    ),
  loading() {
    return (
      <section key="search" className="search">
        <h1>Be Patient, we are loading in the search results.</h1>
      </section>
    );
  }
});

import searchResultsStateManager from './search_results_data_fetch';

// http://babeljs.io/docs/plugins/syntax-dynamic-import/

export default {
  path: '/search/:query',
  component: () => {
    if (process.env.RUNTIME_ENV !== 'browser') {
      // eslint-disable-next-line global-require
      const SearchResultsPage = require('./search_results_page').default;
      return <SearchResultsPage />;
    }
    return <LazySearchResultsPage />;
  },
  loadData: searchResultsStateManager
};
