import { canUseDOM } from 'exenv';
import fetchSearchAction from '../../../../redux/actions/async_search_actions';
import log from '../../../../services/logger_service';

export default function fetchSearchData(nextState, dispatch, state) {
  if (canUseDOM) {
    if (state.config.initialPageLoad === true) {
      return false;
    }
    fetchSearchAction(nextState.params.query, dispatch, state);
    return false;
  }
  return fetchSearchAction(nextState.params.query, dispatch, state)
    .then(function cb() {
      return false;
    })
    .catch(function handleServerSideRenderError(err) {
      log.error(err);
      return false;
    });
}
