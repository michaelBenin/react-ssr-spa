import { canUseDOM } from 'exenv';
import fetchSearchAction from '../../redux/actions/async_search_actions';

export default function fetchSearchData(store) {
  return function fetchData(nextState, replace) {
    const { dispatch } = store;
    // run async
    if (canUseDOM) {
      if (store.getState().config.initialPageLoad === true) {
        return false;
      }
      fetchSearchAction(nextState.params.query, store)(dispatch);
      return false;
    }
    // run sync
    return fetchSearchAction(nextState.params.query, store)(dispatch)
      .then(callback)
      .catch(function handleServerSideRenderError(err) {

      });
  };
}
