import { canUseDOM } from 'exenv';
import asyncHomepageAction from '../../redux/actions/async_homepage_actions';

export default function fetchDataWithStore(store) {
  return function fetchData(nextState, replace, callback) {
    const { dispatch } = store;
    // run async
    if (canUseDOM) {
      if (store.getState().config.initialPageLoad === true) {
        return callback();
      }
      asyncHomepageAction(nextState.params)(dispatch);
      return callback();
    }
    // run sync
    return asyncHomepageAction(nextState.params)(dispatch)
      .then(callback)
      .catch(function handleActionError() {
        // log error
        callback();
      });
  };
}
