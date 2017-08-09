// https://api.github.com/searchs/michaelbenin
// import { canUseDOM } from 'exenv';

export function searchLoading(search = {}, state) {
  return {
    type: 'SEARCH_LOADING',
    isLoading: true,
    search,
    state
  };
}

export function searchLoaded(search, state) {
  return {
    type: 'SEARCH_LOADED',
    isLoading: false,
    search,
    state
  };
}

export function searchError(error, state) {
  return {
    type: 'SEARCH_ERROR',
    isLoading: false,
    error,
    state
  };
}
