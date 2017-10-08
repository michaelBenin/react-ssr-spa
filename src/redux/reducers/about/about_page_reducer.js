export default function(state = {}, action) {
  const typeMap = {
    ABOUT_PAGE_LOADING() {
      return {
        isLoading: true
      };
    },
    ABOUT_PAGE_LOADED() {
      return {
        isLoading: false
      };
    },
    ABOUT_PAGE_ERROR() {
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
