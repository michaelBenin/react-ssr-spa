import { canUseDOM } from 'exenv';
import fetchSearchAction from '../../redux/actions/async_search_actions';

export default function fetchSearchData(store) {
  return function fetchData(nextState, replace, callback) {
    const { dispatch } = store;
    // run async
    if (canUseDOM) {
      if (store.getState().config.initialPageLoad === true) {
        if(callback) {
          return callback();
        }
        return false;
      }
      fetchSearchAction(nextState.params.query, store)(dispatch);
      if(callback) {
        return callback();
      }
      return false;
    }
    // run sync
    return fetchSearchAction(nextState.params.query, store)(dispatch)
      .then(function cb() { if(callback) {
        return callback();
      }
        return false; })
      .catch(function handleServerSideRenderError(err) {
        // log error
        callback(err);
      });
  };
}
