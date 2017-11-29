import { canUseDOM } from 'exenv';
import fetchSearchPageAction from '../../../../redux/actions/search/async_search_page_actions';
import log from '../../../../services/logger_service';

export default function fetchSearchData(nextState, dispatch, state) {
  if (canUseDOM) {
    if (state.config.initialPageLoad === true) {
      return false;
    }
  }
  return fetchSearchPageAction(nextState.params.query, dispatch, state).catch(
    function handleServerSideRenderError(err) {
      log.error(err);
    }
  );
}
