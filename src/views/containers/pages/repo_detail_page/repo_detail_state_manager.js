import { canUseDOM } from 'exenv';
import asyncRepoDetailAction from '../../../../redux/actions/async_repo_detail_actions';
import log from '../../../../services/logger_service';

export default function fetchData(match, dispatch, state) {
  // run async
  if (canUseDOM) {
    if (state.config.initialPageLoad === true) {
      return false;
    }
    asyncRepoDetailAction(match.params, dispatch, state);
    return false;
  }
  // run sync
  return asyncRepoDetailAction(match.params, dispatch, state)
    .then(function cb() {
      return false;
    })
    .catch(function handleActionError(err) {
      log.error(err);
      return false;
    });
}
