import request from 'request';
import config from '../config';

const apiUrl = config.get('apiUrl');

export default (req, res) => {
  req.pipe(request(`http://${apiUrl}/api/v1/sitemap.xml`)).pipe(res);
};
