import get from 'lodash/get';
import last from 'lodash/last';
import baseSeoUtil from './base_seo_util';

// eslint-disable-next-line no-unused-vars
export default function(state, data) {
  return baseSeoUtil({
    site: 'react-ssr-spa',
    siteConf: {
      '[og:site_name]': 'react-ssr-spa'
    },
    facebook: {
      fanpageId: ''
    },
    title: 'Homepage of react-ssr-spa',
    url: last(get(state, 'config.navHistory')),
    description:
      'An example of simple server rendering a react progressive web app.',
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    extend: [
      {
        meta: [
          /*
          {
            property: 'article:published_time',
            content: articleDate
          }
          */
        ]
      }
    ]
  });
}
