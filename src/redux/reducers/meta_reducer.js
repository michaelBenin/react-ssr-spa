import { get } from 'lodash';

function getMetaRepo(action) {
  return {
    title: `${get(action, 'repo.name')} - ${get(action, 'repo.description')}`,
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      { name: 'subject', content: '' },
      { name: 'description', content: `${get(action, 'repo.description')}` },
      { name: 'keywords', content: '' },
      { name: 'news_keywords', content: '' },
      { name: 'revised', content: '' },
      { name: 'distribution', content: '' },
      { name: 'topic', content: '' },
      { name: 'summary', content: '' },
      { name: 'category', content: '' },
      { name: 'coverage', content: '' },
      { name: 'robots', content: '' },
      { name: 'googlebot', content: '' },
      { name: 'application-name', content: '' },
      { name: 'language', content: '' },
      { name: 'rating', content: '' },

      { name: 'twitter:card', content: '' },
      { name: 'twitter:url', content: '' },
      { name: 'twitter:title', content: '' },
      {
        name: 'twitter:description',
        content: `${get(action, 'repo.description')}`
      },
      {
        name: 'twitter:image',
        content: `${get(action, 'repo.owner.avatar_url')}`
      },
      { name: 'twitter:site', content: '' },
      { name: 'twitter:creator', content: '' },

      { name: 'skype_toolbar', content: '' },
      { name: 'google-site-verification', content: '' },
      { name: 'p:domain_verify', content: '' },
      { name: 'yandex-verification', content: '' },
      { name: 'msvalidate.01', content: '' },
      { name: 'msapplication-TileColor', content: '' },
      { name: 'msapplication-TileImage', content: '' },
      { name: 'theme-color', content: '' },

      { property: 'fb:app_id', content: '' },
      { property: 'fb:pages', content: '' },
      { property: 'fb:pages', content: '' },
      { property: 'og:url', content: '' },
      { property: 'og:title', content: '' },
      { property: 'og:image', content: '' },
      {
        property: 'og:description',
        content: `${get(action, 'repo.description')}`
      },
      { property: 'og:type', content: '' },
      { property: 'og:site_name', content: '' },
      { property: 'og:locale', content: '' },
      { property: 'og:title', content: '' },
      { property: 'op:markup_version', content: '' },
      { property: 'fb:article_style', content: '' },

      { itemProp: 'name', content: '' },
      {
        itemProp: 'description',
        content: `${get(action, 'repo.description')}`
      },
      { itemProp: 'image', content: `${get(action, 'repo.owner.avatar_url')}` },

      { httpEquiv: 'refresh', content: '' },
      { httpEquiv: 'x-ua-compatible', content: '' },
      { httpEquiv: 'cleartype', content: '' }
    ],
    link: [
      { rel: 'dns-prefetch', href: '' },
      { rel: 'shortcut-icon', href: '' },
      { rel: 'alternate', type: 'application/rss+xml', title: '', href: '' },
      { rel: 'canonical', href: '' },
      { rel: 'publisher', href: '' },
      { rel: 'image_src', href: `${get(action, 'repo.owner.avatar_url')}` },

      { rel: 'apple-touch-icon', sizes: '', href: '' },
      { rel: 'apple-touch-icon', sizes: '', href: '' },
      { rel: 'apple-touch-icon', sizes: '', href: '' },
      { rel: 'apple-touch-icon', sizes: '', href: '' },
      { rel: 'apple-touch-icon', sizes: '', href: '' },
      { rel: 'apple-touch-icon', sizes: '', href: '' },
      { rel: 'apple-touch-icon', sizes: '', href: '' },
      { rel: 'apple-touch-icon', sizes: '', href: '' },
      { rel: 'apple-touch-icon', sizes: '', href: '' },

      { rel: 'icon', type: 'image/png', sizes: '', href: '' },
      { rel: 'icon', type: 'image/png', sizes: '', href: '' },
      { rel: 'icon', type: 'image/png', sizes: '', href: '' },

      { rel: 'manifest', href: '' }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: "{ '@context': 'http://schema.org' }"
      }
    ],
    noscript: [],
    style: []
  };
}

export default function(state = {}, action) {
  const { type } = action;

  const typeMap = {
    REPO_DETAIL_LOADED(act) {
      return getMetaRepo(act);
    },

    SEARCH_LOADED() {
      return state;
    }
  };

  if (typeMap[type]) {
    return typeMap[type](action);
  }

  return state;
}
