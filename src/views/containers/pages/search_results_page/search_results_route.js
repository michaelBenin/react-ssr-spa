import SearchResultsPage from './search_results_page';
import searchResultsStateManager from './search_results_state_manager';

export default {
  path: '/search/:query',
  component: SearchResultsPage,
  loadData: searchResultsStateManager
};
