import { canUseDOM } from 'exenv';
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

// Page Containers with components
import Layout from '../views/containers/layouts/layout';
import IndexPage from '../views/containers/pages/index_page/index_page';
import AboutPage from '../views/containers/pages/about_page/about_page';

import NotFound from '../views/containers/pages/not_found_page/not_found_page';
import SearchResultsPage from '../views/containers/pages/search_results_page/search_results_page';
import RepoDetailPage from '../views/containers/pages/repo_detail_page/repo_detail_page';

// Data handle async / sync data fetching for page
import repoDetailStateManager from './route_state_managers/repo_detail_state_manager';
import notFoundStateManager from './route_state_managers/not_found_state_manager';
import searchResultsStateManager from './route_state_managers/search_results_state_manager';
import homepageStateManager from './route_state_managers/homepage_state_manager';

function logPageView() {
  if (canUseDOM) {
    if (window.ga) {
      window.ga('set', 'page', window.location.pathname);
      return window.ga('send', 'pageview');
    }
    return false;
  }
  return false;
}
/**
 * This function returns the routes with history and the store
 * Depending on which environment we have these 3 scenarios:
 * 1) Render from server, handle sync, make sure the onEnter actions and store get
 * dispatched sync. Do not show the loading state.
 * 2) We are rendering on the initial page load on the client. This means we already
 * have the state bootstrapped and just call callback. Do nothing, we have the data.
 * 3) We are rendering after initial pageload. Handle async. We should both dispatch
 * the loading state as well as dispatch the completed data async.
 * @param {history} history object for react router, can be memory history for server
 * or browserHistory for client.
 * @param {store} redux store needed for the handling of async/sync dispatching
 * depending on environment and if initial page load.
 * @returns {routes} react router routes with their necessary story and history.
 */
export default function giveRoutesHystoryAndStore(history, store) {
  return (
    <Router
      history={history}
      onUpdate={logPageView}
    >
      <Route path="/" component={Layout}>
        <IndexRoute
          component={IndexPage}
          onEnter={homepageStateManager(store)}
        />
        <Route
          path="/about"
          component={AboutPage}
        />
        <Route
          path="/search/:query"
          component={SearchResultsPage}
          onEnter={searchResultsStateManager(store)}
        />
        <Route
          path="/repo/:user/:title"
          component={RepoDetailPage}
          onEnter={repoDetailStateManager(store)}
        />
        <Route
          path="*"
          component={NotFound}
          onEnter={notFoundStateManager(store)}
        />
      </Route>
    </Router>
  );
}

