import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import configReducer from './config_reducer';
import metaReducer from './meta_reducer';
import statusReducer from './status_reducer';
import repoDetailReducer from './repo_detail_reducer';
import searchResultsReducer from './search_results_reducer';
import homepageReducer from './homepage_reducer';

export default combineReducers({
  routing: routerReducer,
  config: configReducer,
  meta: metaReducer,
  status: statusReducer,
  homepage: homepageReducer,
  repoDetail: repoDetailReducer,
  search: searchResultsReducer
});
