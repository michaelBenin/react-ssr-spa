import { canUseDOM } from 'exenv';
import asyncRepoDetailAction from '../../redux/actions/async_repo_detail_actions';

export default function fetchDataWithStore(store) {
  return function fetchData(nextState, replace, callback) {
    const { dispatch } = store;
    // run async
    if (canUseDOM) {
      if (store.getState().config.initialPageLoad === true) {
        if (callback) {
          return callback();
        }
        return false;
      }
      asyncRepoDetailAction(nextState.params, store)(dispatch);
      if (callback) {
        return callback();
      }
      return false;
    }
    // run sync
    return asyncRepoDetailAction(nextState.params, store)(dispatch)
      .then(function cb() {
        if (callback) {
          return callback();
        }
        return false;
      })
      .catch(
        function handleActionError(/* err*/) {
          // log error
          if (callback) {
            return callback();
          }
          return false;
        }
      );
  };
}
