import P from 'bluebird';
import * as indexPageActions from '../../action_creators/index/index_page_action_creators';
import notFoundActionCreator from '../../action_creators/not_found_status_action_creator';
import log from '../../../services/logger_service';

export default function fetchIndexData(params, dispatch, state) {
  dispatch(indexPageActions.indexPageLoading());
  return P.all([
    // This is a static page, but if you needed data
  ])
    .then(function handleIndexPageDataLoaded() {
      dispatch(indexPageActions.indexPageLoaded());
    })
    .catch(function handleUserError(err) {
      log.error(err, 'Error in fetching repo detail page.');
      dispatch(notFoundActionCreator(500, 'ERROR_STATUS'));
      dispatch(indexPageActions.indexPageLoadError(err, state));
    });
}
