// https://api.github.com/searchs/michaelbenin
// import { canUseDOM } from 'exenv';

export function searchPageLoading(state = {}) {
  return {
    type: 'SEARCH_PAGE_LOADING',
    isLoading: true,
    state
  };
}

export function searchPageLoaded(state = {}) {
  return {
    type: 'SEARCH_PAGE_LOADED',
    isLoading: false,
    state
  };
}

export function searchPageError(error, state = {}) {
  return {
    type: 'SEARCH_PAGE_ERROR',
    isLoading: false,
    state,
    error
  };
}
