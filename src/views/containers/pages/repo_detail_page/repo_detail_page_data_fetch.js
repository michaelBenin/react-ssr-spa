import { canUseDOM } from 'exenv';
import asyncRepoDetailPageAction from '../../../../redux/actions/repo_detail/async_repo_detail_page_actions';
import log from '../../../../services/logger_service';

export default function fetchData(match, dispatch, state) {
  if (canUseDOM) {
    if (state.config.initialPageLoad === true) {
      return false;
    }
  }
  return asyncRepoDetailPageAction(
    match.params,
    dispatch,
    state
  ).catch(function handleActionError(err) {
    log.error(err);
  });
}
