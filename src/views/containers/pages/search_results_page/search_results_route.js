import React from 'react';
import { asyncComponent } from 'react-async-component';
import searchResultsStateManager from './search_results_data_fetch';

// http://babeljs.io/docs/plugins/syntax-dynamic-import/

export default {
  path: '/search/:query',
  render: () => {
    if (process.env.RUNTIME_ENV !== 'browser') {
      // eslint-disable-next-line global-require
      const SearchResultsPage = require('./search_results_page').default;
      return <SearchResultsPage />;
    }
    const SearchResultsPage = asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "search" */ './search_results_page'),
      autoResolveES2015Default: true,
      env: 'browser',
      LoadingComponent: () => <div>Loading...</div>, // Optional
      // eslint-disable-next-line react/prop-types
      ErrorComponent: ({ error }) => <div>{error.message}</div>
    });
    return <SearchResultsPage />;
  },
  loadData: searchResultsStateManager
};
