import { canUseDOM } from 'exenv';
import extend from 'lodash/extend';

export default function(
  state = {
    code: 200
  },
  action
) {
  if (action.type === 'NOT_FOUND_STATUS') {
    return {
      code: 404
    };
  }

  if (action.type === 'ERROR_STATUS') {
    return {
      code: 500
    };
  }

  if (/PAGE_LOADING/.test(action.type) && canUseDOM) {
    return extend({}, state, {
      code: 200
    });
  }

  return state;
}
