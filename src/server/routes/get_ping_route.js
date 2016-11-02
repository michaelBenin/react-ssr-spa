import ping from '../controllers/get_ping_controller';

export default (router) => {
  router.get('/api/v1/ping', ping);
};
