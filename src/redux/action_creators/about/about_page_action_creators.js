export function aboutPageLoading(state = {}) {
  return {
    type: 'ABOUT_PAGE_LOADING',
    isLoading: true,
    state
  };
}

export function aboutPageLoaded(state = {}) {
  return {
    type: 'ABOUT_PAGE_LOADED',
    isLoading: false,
    state
  };
}

export function aboutPageLoadError(state = {}, error) {
  return {
    type: 'ABOUT_PAGE_ERROR',
    isLoading: false,
    state,
    error
  };
}
