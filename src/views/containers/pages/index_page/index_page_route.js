import IndexPage from './index_page';
import indexPageLoadData from './index_page_data_fetch';

export default {
  path: '/',
  component: IndexPage,
  exact: true,
  strict: true,
  loadData: indexPageLoadData
};
