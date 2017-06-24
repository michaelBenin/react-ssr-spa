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

export default function getRoutesWithStore(store) {
  return [
    {
      component: Layout,
      routes: [
        {
          path: '/about',
          component: AboutPage
        },
        {
          path: '/search/:query',
          component: SearchResultsPage,
          loadData: searchResultsStateManager(store)
        },
        {
          path: '/repo/:user/:title',
          component: RepoDetailPage,
          loadData: repoDetailStateManager(store)
        },
        {
          path: '/',
          component: IndexPage,
          exact: true,
          strict: true
        },
        {
          component: NotFound,
          loadData: notFoundStateManager(store)
        }
      ]
    }
  ];
}
