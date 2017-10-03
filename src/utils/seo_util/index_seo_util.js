import baseSeoUtil from './base_seo_util';

// eslint-disable-next-line no-unused-vars
export default function(state, action) {
  const data = baseSeoUtil({
    site: '',
    siteConf: {},
    title: '',
    url: '',
    description: '',
    image: '',
    image_width: '',
    image_height: '',
    articleSection: '',
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

  return data;
}
