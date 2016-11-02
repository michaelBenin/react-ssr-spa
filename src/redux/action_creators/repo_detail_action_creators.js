// import { canUseDOM } from 'exenv';

export function repoDetailLoading(repo = {}) {
  return {
    type: 'REPO_DETAIL_LOADING',
    repo
  };
}

export function repoDetailLoaded(repo = {}) {
  return {
    type: 'REPO_DETAIL_LOADED',
    repo
  };
}

export function repoDetailLoadError(error) {
  return {
    type: 'REPO_DETAIL_ERROR',
    repo: {
      isLoading: false,
      error: true,
      errorMessage: error ? error.message : 'no message'
    }
  };
}

