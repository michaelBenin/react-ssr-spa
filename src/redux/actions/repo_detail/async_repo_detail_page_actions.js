import P from 'bluebird';
import * as repoDetailPageActions from '../../action_creators/repo_detail/repo_detail_page_action_creators';
import notFoundActionCreator from '../../action_creators/not_found_status_action_creator';
import log from '../../../services/logger_service';

import repoDetailAsyncAction from './async_repo_detail_actions';

export default function fetchRepoDetail(params, dispatch, state) {
  dispatch(repoDetailPageActions.repoDetailPageLoading());
  return P.all([repoDetailAsyncAction(params, dispatch, state)])
    .then(function handleRepoDetailData() {
      dispatch(repoDetailPageActions.repoDetailPageLoaded());
    })
    .catch(function handleUserError(err) {
      log.error(err, 'Error in fetching repo detail page.');
      dispatch(notFoundActionCreator(500, 'ERROR_STATUS'));
      dispatch(repoDetailPageActions.repoDetailPageLoadError(err, state));
    });
}
