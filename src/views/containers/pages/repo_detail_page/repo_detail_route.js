import RepoDetailPage from './repo_detail_page';
import repoDetailStateManager from './repo_detail_state_manager';

export default {
  path: '/repo/:user/:title',
  component: RepoDetailPage,
  loadData: repoDetailStateManager
};
