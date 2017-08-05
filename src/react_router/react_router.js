// Page Containers with components
import Layout from '../views/containers/layouts/layout';

// Data handle async / sync data fetching for page
import IndexPageRoute from '../views/containers/pages/index_page/index_page_route';
import searchResultsRoute from '../views/containers/pages/search_results_page/search_results_route';
import aboutRoute from '../views/containers/pages/about_page/about_route';
import repoDetailRoute from '../views/containers/pages/repo_detail_page/repo_detail_route';
import notFoundRoute from '../views/containers/pages/not_found_page/not_found_route';

export default [
  {
    component: Layout,
    routes: [
      aboutRoute,
      searchResultsRoute,
      repoDetailRoute,
      IndexPageRoute,
      notFoundRoute
    ]
  }
];
