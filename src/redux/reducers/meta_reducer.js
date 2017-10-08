import repoDetailSeoUtil from '../../utils/seo_util/repo_detail_seo_util';
import indexSeoUtil from '../../utils/seo_util/index_seo_util';
import searchSeoUtil from '../../utils/seo_util/search_seo_util';
import aboutSeoUtil from '../../utils/seo_util/about_seo_util';

const typeMap = {
  INDEX_PAGE_LOADED(state, action) {
    return indexSeoUtil(state, action);
  },

  ABOUT_PAGE_LOADED(state, action) {
    return aboutSeoUtil(state, action);
  },

  REPO_DETAIL_PAGE_LOADED({ state, data }) {
    return repoDetailSeoUtil(state, data);
  },

  SEARCH_PAGE_LOADED(state, action) {
    return searchSeoUtil(state, action);
  }
};

export default function(state = {}, action) {
  const { type } = action;

  if (typeMap[type]) {
    return typeMap[type](action);
  }

  return state;
}
