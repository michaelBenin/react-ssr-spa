import { canUseDOM } from 'exenv';
import notFoundActionCreator from '../../redux/action_creators/not_found_status_action_creator';

export default function NotFound(store) {
  return function handleNotFound(nextState, replace, callback) {
    if (canUseDOM) {
      if (callback) {
        return callback();
      }
      return false;
    }
    const { dispatch } = store;
    dispatch(notFoundActionCreator(404, 'NOT_FOUND_STATUS'));
    if (callback) {
      return callback();
    }
    return false;
  };
}
