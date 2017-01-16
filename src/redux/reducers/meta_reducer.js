import repoDetailSeoUtil from '../../utils/seo_utils/repo_seo_util';
import homepageSeoUtil from '../../utils/seo_utils/homepage_seo_util';

export default function (state = {}, action) {
  const { type } = action;

  const typeMap = {
    HOMEPAGE_LOADED(act) {
      return homepageSeoUtil(act);
    },

    REPO_DETAIL_LOADED(act) {
      return repoDetailSeoUtil(act);
    },

    SEARCH_LOADED() {
      return state;
    }
  };

  if (typeMap[type]) {
    return typeMap[type](action);
  }

  return state;
}
