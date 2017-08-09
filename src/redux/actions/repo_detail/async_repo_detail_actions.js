import * as repoDetailActions from '../../action_creators/repo_detail/repo_detail_action_creators';
import RepoDetailModel from '../../../models/repo_detail';
import notFoundActionCreator from '../../action_creators/not_found_status_action_creator';
import log from '../../../services/logger_service';

export default function fetchRepoDetail(params, dispatch, state) {
  dispatch(repoDetailActions.repoDetailLoading());
  return RepoDetailModel.fetch(params, state)
    .then(function handleRepoDetailData(repoData) {
      dispatch(repoDetailActions.repoDetailLoaded(repoData.data, state));
    })
    .catch(function handleUserError(err) {
      log.error(err, 'Error in fetching repo.');
      dispatch(notFoundActionCreator(500, 'ERROR_STATUS'));
      dispatch(repoDetailActions.repoDetailLoadError(err, state));
    });
}
