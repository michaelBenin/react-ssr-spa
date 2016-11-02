import robotsController from '../controllers/get_robots_txt_controller';

export default (router) => {
  router.get('/robots.txt', robotsController);
};
