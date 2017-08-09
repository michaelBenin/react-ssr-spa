// https://github.com/reactjs/redux/issues/99
// import { canUseDOM } from 'exenv';

export default function(state = {}, action) {
  const typeMap = {
    REPO_DETAIL_PAGE_LOADING() {
      return {
        isLoading: true
      };
    },
    REPO_DETAIL_PAGE_LOADED() {
      return {
        isLoading: false
      };
    },
    REPO_DETAIL_PAGE_ERROR() {
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
