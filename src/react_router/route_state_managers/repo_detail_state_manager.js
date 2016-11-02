import { canUseDOM } from 'exenv';
import asyncRepoDetailAction from '../../redux/actions/async_repo_detail_actions';

export default function fetchDataWithStore(store) {
  return function fetchData(nextState, replace, callback) {
    const { dispatch } = store;
    // run async
    if (canUseDOM) {
      if (store.getState().config.initialPageLoad === true) {
        return callback();
      }
      asyncRepoDetailAction(nextState.params)(dispatch);
      return callback();
    }
    // run sync
    return asyncRepoDetailAction(nextState.params)(dispatch)
      .then(callback)
      .catch(function handleActionError() {
        // log error
        callback();
      });
  };
}
