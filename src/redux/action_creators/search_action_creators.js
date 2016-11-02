// https://api.github.com/searchs/michaelbenin
// import { canUseDOM } from 'exenv';

export function searchLoading(search = {}) {
  return {
    type: 'SEARCH_LOADING',
    search
  };
}

export function searchLoaded(search) {
  return {
    type: 'SEARCH_LOADED',
    search
  };
}

export function searchError(error) {
  return {
    type: 'SEARCH_ERROR',
    search: {
      isLoading: false,
      error: true,
      errorMessage: error ? error.message : 'no message'
    }
  };
}

