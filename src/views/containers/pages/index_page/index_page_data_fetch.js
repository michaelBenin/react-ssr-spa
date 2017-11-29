import { canUseDOM } from 'exenv';
import asyncIndexPageAction from '../../../../redux/actions/index/async_index_page_actions';
import log from '../../../../services/logger_service';

export default function fetchIndexData(match, dispatch, state) {
  if (canUseDOM) {
    if (state.config.initialPageLoad === true) {
      return false;
    }
  }
  return asyncIndexPageAction(match.params, dispatch, state).catch(
    function handleError(err) {
      log.error(err);
    }
  );
}
