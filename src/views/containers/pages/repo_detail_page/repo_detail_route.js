import RepoDetailPage from './repo_detail_page';
import repoDetailPageStateManager from './repo_detail_page_data_fetch';

export default {
  path: '/repo/:user/:title',
  component: RepoDetailPage,
  loadData: repoDetailPageStateManager
};
