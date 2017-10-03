import get from 'lodash/get';
import baseSeoUtil from './base_seo_util';

export default function(state, data) {
  return baseSeoUtil({
    site: 'react-ssr-spa',
    siteConf: {
      '[og:site_name]': 'react-ssr-spa'
    },
    facebook: {
      fanpageId: ''
    },
    title: get(data, '[0].name'),
    url: get(state, 'config.navHistory[0]'),
    description: get(data, '[0].description'),
    image: get(data, '[0].owner.avatar_url'),
    articleSection: get(data, '[0].language'),
    appId: '',
    extend: [
      {
        meta: [
          {
            property: 'article:published_time',
            content: get(data, '[0].created_at')
          }
        ]
      }
    ]
  });
}
