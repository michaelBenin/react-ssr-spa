export default function(state = {}, action) {
  const typeMap = {
    INDEX_PAGE_LOADING() {
      return {
        isLoading: true
      };
    },
    INDEX_PAGE_LOADED() {
      return {
        isLoading: false
      };
    },
    INDEX_PAGE_ERROR() {
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
