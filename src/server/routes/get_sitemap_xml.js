import sitemapController from '../controllers/get_sitemap_xml_controller';

export default (router) => {
  router.get('/sitemap.xml', sitemapController);
};
