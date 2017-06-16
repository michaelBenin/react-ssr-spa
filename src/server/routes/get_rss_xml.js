import rssController from '../controllers/get_rss_xml_controller';

export default router => {
  router.get('/rss.xml', rssController);
};
