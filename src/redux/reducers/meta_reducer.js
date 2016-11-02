// import { canUseDOM } from 'exenv';

const defaultMeta = {
  title: 'react-ssr-spa - Server Side Rendered React Single Page App',
  description: 'Website Example', // eslint-disable-line max-len
  subject: 'Example',
  keywords: 'Code, React', // eslint-disable-line max-len
  news_keywords: 'Hackernews',
  topic: 'Code',
  category: 'Code',
  summary: 'react-ssr-spa tech website',
  url: 'http://react-ssr-spa',
  image: 'assets/images/react-ssr-spa-logo.png'
};

export default function (state = {}, action) {
  const { type } = action;
  const typeMap = {
    REPO_DETAIL_LOADED() {
      return defaultMeta;
    },

    SEARCH_LOADED() {
      return defaultMeta;
    }
  };

  if (typeMap[type]) {
    return typeMap[type](state);
  }

  return state;
}
