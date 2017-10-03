export function indexPageLoading(state = {}) {
  return {
    type: 'INDEX_PAGE_LOADING',
    isLoading: true,
    state
  };
}

export function indexPageLoaded(state = {}) {
  return {
    type: 'INDEX_PAGE_LOADED',
    isLoading: false,
    state
  };
}

export function indexPageLoadError(state = {}, error) {
  return {
    type: 'INDEX_PAGE_ERROR',
    isLoading: false,
    state,
    error
  };
}
