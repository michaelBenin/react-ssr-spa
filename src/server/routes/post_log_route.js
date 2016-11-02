import logController from '../controllers/post_log_controller';

export default (router) => {
  router.post('/api/v1/log', logController);
};
