// https://api.github.com/searchs/michaelbenin
// import { canUseDOM } from 'exenv';
import P from 'bluebird';
import * as searchPageActions from '../../action_creators/search/search_page_action_creators';
import notFoundActionCreator from '../../action_creators/not_found_status_action_creator';
import log from '../../../services/logger_service';
import searchAsyncAction from './async_search_actions';

export default function fetchRepoDetail(params, dispatch, state) {
  dispatch(searchPageActions.searchPageLoading());
  return P.all([searchAsyncAction(params, dispatch, state)])
    .then(function handleRepoDetailData() {
      dispatch(searchPageActions.searchPageLoaded());
    })
    .catch(function handleUserError(err) {
      log.error(err, 'Error in search page.');
      dispatch(notFoundActionCreator(500, 'ERROR_STATUS'));
      dispatch(searchPageActions.searchPageLoadError(err, state));
    });
}
