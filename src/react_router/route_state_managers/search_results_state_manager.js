import { canUseDOM } from 'exenv';
import fetchSearchAction from '../../redux/actions/async_search_actions';

export default function fetchSearchData(store) {
  return function fetchData(nextState, replace, callback) {
    const { dispatch } = store;
    // run async
    if (canUseDOM) {
      if (store.getState().config.initialPageLoad === true) {
        return callback();
      }
      fetchSearchAction(nextState.params.query)(dispatch);
      return callback();
    }
    // run sync
    return fetchSearchAction(nextState.params.query)(dispatch)
      .then(callback)
      .catch(function handleServerSideRenderError() {
        // log error
        callback();
      });
  };
}
