import get from 'lodash/get';

export default function(data = {}) {
  const { siteConf, title, type, publisher = true, extend = [] } = data;
  const siteHumanReadable = get(siteConf, '[og:site_name]', '');
  const description = data.description || '';
  const url = data.url || '';
  const siteSlug = data.slug || '';
  const image = data.image || data.logo;

  const config = {
    title,
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        httpEquiv: 'X-UA-Compatible',
        content: 'IE=edge,chrome=1'
      },
      {
        property: 'fb:pages',
        content: get(data, 'facebook.fanpageId')
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      {
        name: 'description',
        content: description
      },
      {
        property: 'og:type',
        content: type || 'article'
      },
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:url',
        content: url
      },
      {
        property: 'og:locale',
        content: 'en_US'
      },
      {
        property: 'og:description',
        content: description
      },
      {
        property: 'og:image',
        content: image
      },
      {
        property: 'og:site_name',
        content: siteHumanReadable
      },
      {
        property: 'fb:app_id',
        content: get(data, 'appId')
      },
      {
        property: 'fb:admins',
        content: get(data, 'appAdminId')
      },
      {
        name: 'twitter:card',
        content: data.twitterCard || 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: title
      },
      {
        name: 'twitter:description',
        content: description
      },
      {
        name: 'twitter:url',
        content: url
      },
      {
        name: 'twitter:site',
        content: `@${siteSlug}`
      },
      {
        name: 'twitter:image',
        content: data.twitterImage || image
      },
      {
        name: 'twitter:domain',
        content: `${siteSlug}.com`
      },
      {
        itemProp: 'name',
        content: title
      },
      {
        itemProp: 'description',
        content: description
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: url
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png?v=2'
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-32x32.png',
        sizes: '32x32'
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-16x16.png',
        sizes: '16x16'
      },
      {
        rel: 'manifest',
        href: '/manifest.json'
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#000000'
      },
      {
        rel: 'shortcut icon',
        href: '/favicon.ico?v=3'
      },
      {
        rel: 'alternate',
        href: url,
        hrefLang: 'en'
      }
    ],
    noscript: [],
    style: []
  };

  if (publisher) {
    config.meta.push({
      property: 'article:publisher',
      content: siteConf['article:publisher'] || ''
    });
  }

  if (data.articleSection) {
    config.meta.push({
      property: 'article:section',
      content: data.articleSection
    });
  }

  // Extend is used to add objects to the arrays in the config object.
  // For example if you would like to add another meta tag you can:
  // const data = baseSeoUtil({
  //   ...
  //   extend: [{
  //     meta: [{
  //       property: 'META_PROPERTY',
  //       content: 'META_CONTENT'
  //     }]
  //   }]
  // });
  extend.forEach(extras => {
    const key = Object.keys(extras).join('');
    const arr = extras[key];

    config[key] = config[key].concat(arr);
  });

  return config;
}
