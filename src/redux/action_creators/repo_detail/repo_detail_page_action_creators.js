// import { canUseDOM } from 'exenv';

export function repoDetailPageLoading(state = {}) {
  return {
    type: 'REPO_DETAIL_PAGE_LOADING',
    isLoading: true,
    state
  };
}

export function repoDetailPageLoaded(state = {}) {
  return {
    type: 'REPO_DETAIL_PAGE_LOADED',
    isLoading: false,
    state
  };
}

export function repoDetailPageLoadError(state = {}, error) {
  return {
    type: 'REPO_DETAIL_PAGE_ERROR',
    isLoading: false,
    state,
    error
  };
}
