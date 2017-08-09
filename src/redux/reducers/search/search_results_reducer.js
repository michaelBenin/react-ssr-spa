// https://github.com/reactjs/redux/issues/99
// import { canUseDOM } from 'exenv';

export default function(state = {}, action) {
  const typeMap = {
    SEARCH_LOADING() {
      return {
        isLoading: true
      };
    },
    SEARCH_LOADED() {
      return {
        isLoading: false,
        response: action.search
      };
    },
    SEARCH_ERROR() {
      return {
        isLoading: false,
        error: action.error
      };
    }
  };

  if (typeMap[action.type]) {
    return typeMap[action.type]();
  }

  return state;
}
