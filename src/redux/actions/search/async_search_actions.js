// https://api.github.com/searchs/michaelbenin
// import { canUseDOM } from 'exenv';
import * as searchActions from '../../action_creators/search/search_action_creators';
import notFoundActionCreator from '../../action_creators/not_found_status_action_creator';
import SearchModel from '../../../models/search';
import log from '../../../services/logger_service';

export default function fetchSearchAction(query, dispatch, state) {
  dispatch(searchActions.searchLoading());
  return SearchModel.fetch(query, state)
    .then(function handleSearchModelData(searchData) {
      dispatch(searchActions.searchLoaded(searchData.data, state));
    })
    .catch(function handleSearchError(err) {
      log.error(err, 'Error in fetching repo.');
      dispatch(notFoundActionCreator(500, 'ERROR_STATUS'));
      dispatch(searchActions.searchError(err, state));
    });
}
