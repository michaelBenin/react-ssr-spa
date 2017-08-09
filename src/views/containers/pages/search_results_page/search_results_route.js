import SearchResultsPage from './search_results_page';
import searchResultsStateManager from './search_results_data_fetch';

export default {
  path: '/search/:query',
  component: SearchResultsPage,
  loadData: searchResultsStateManager
};
