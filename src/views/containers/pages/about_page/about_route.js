import AboutPage from './about_page';
import aboutPageLoadData from './about_page_data_fetch';

export default {
  path: '/about',
  component: AboutPage,
  exact: true,
  strict: true,
  loadData: aboutPageLoadData
};
