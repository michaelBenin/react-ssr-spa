
export default (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

Sitemap: http://react-ssr-spa/sitemap.xml`);
};
