import { extend } from 'lodash';
import * as repoDetailActions from './../action_creators/repo_detail_action_creators';
import RepoDetailModel from '../../models/repo_detail';
import notFoundActionCreator from '../../redux/action_creators/not_found_status_action_creator';
import log from '../../services/logger_service';

export default function fetchRepoDetail(params, store) {
  return function firstDispatch(dispatch) {
    dispatch(repoDetailActions.repoDetailLoading());
    return RepoDetailModel.fetch(params, store)
      .then(function handleRepoDetailData(RepoData) {
        dispatch(repoDetailActions.repoDetailLoaded(RepoData.data));
      })
      .catch(function handleUserError(err) {
        log.error(err, 'Error in fetching repo.');

        if (err && err.code === 'ENOTFOUND') {
          extend(err, {
            message: 'No Internet Connectivity'
          });
          dispatch(notFoundActionCreator(500, 'ERROR_STATUS'));
        }
        dispatch(repoDetailActions.repoDetailLoadError(err));
      });
  };
}
