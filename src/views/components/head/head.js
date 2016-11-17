import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { get as _get } from 'lodash';

function Head(props) {
  return (
    <head lang="en">
      <meta charSet="UTF-8" />
      <title>{_get(props, 'meta.title')}</title>
      <link rel="dns-prefetch" href="" />
      <link href={`${props.staticUrl}/css/main.css`} rel="stylesheet" />
      <link rel="shortcut icon" href={`${props.staticUrl}/assets/icons/favicon.ico`} />
      <meta name="description" content={_get(props, 'meta.description')} />
      <meta name="subject" content={_get(props, 'meta.subject')} />
      <meta name="keywords" content={_get(props, 'meta.keywords')} />
      <meta name="news_keywords" content={_get(props, 'meta.news_keywords')} />
      <meta name="revised" content={_get(props, 'meta.revised')} />
      <meta name="distribution" content="Global" />
      <meta name="topic" content={_get(props, 'meta.topic')} />
      <meta name="summary" content={_get(props, 'meta.summary')} />
      <meta name="category" content={_get(props, 'meta.category')} />
      <meta name="coverage" content="Worldwide" />
      <meta name="robots" content="index,follow,noodp" />
      <meta name="googlebot" content="index,follow" />
      <meta name="application-name" content="react-ssr-spa" />
      <meta name="language" content="en" />
      <meta name="rating" content="General" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="react-ssr-spa RSS Feed"
        href="/rss.xml"
      />
      <meta property="fb:app_id" content="" />
      <meta property="fb:pages" content="" />
      <meta property="og:url" content={_get(props, 'meta.url')} />
      <meta property="og:title" content={_get(props, 'meta.title')} />
      <meta property="og:image" content={_get(props, 'meta.image')} />
      <meta property="og:description" content={_get(props, 'meta.description')} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="react-ssr-spa" />
      <meta property="og:locale" content="en_US" />

      <meta property="op:markup_version" content="v1.0" />
      <link href={_get(props, 'meta.url')} rel="canonical" />
      <meta property="fb:article_style" content="myarticlestyle" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={_get(props, 'meta.url')} />
      <meta name="twitter:title" content={_get(props, 'meta.title')} />
      <meta name="twitter:description" content={_get(props, 'meta.description')} />
      <meta name="twitter:image" content={_get(props, 'meta.image')} />
      <meta name="twitter:site" content="@react-ssr-spa" />
      <meta name="twitter:creator" content="@react-ssr-spa" />

      <link href="" rel="publisher" />
      <meta itemProp="name" content={_get(props, 'meta.title')} />
      <meta itemProp="description" content={_get(props, 'meta.description')} />
      <meta itemProp="image" content={_get(props, 'meta.image')} />

      <meta httpEquiv="refresh" content="3600" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta httpEquiv="cleartype" content="on" />
      <meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />

      <link rel="image_src" href={_get(props, 'meta.image')} />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta name="google-site-verification" content="" />
      <meta name="p:domain_verify" content="" />
      <meta name="yandex-verification" content="" />
      <meta name="msvalidate.01" content="" />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href={`${props.staticUrl}/assets/icons/apple-icon-57x57.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href={`${props.staticUrl}/assets/icons/apple-icon-60x60.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href={`${props.staticUrl}/assets/icons/apple-icon-72x72.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${props.staticUrl}/assets/icons/apple-icon-76x76.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href={`${props.staticUrl}/assets/icons/apple-icon-114x114.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={`${props.staticUrl}/assets/icons/apple-icon-120x120.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={`${props.staticUrl}/assets/icons/apple-icon-144x144.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={`${props.staticUrl}/assets/icons/apple-icon-152x152.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${props.staticUrl}/assets/icons/apple-icon-180x180.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={`${props.staticUrl}/assets/icons/android-icon-192x192.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${props.staticUrl}/assets/icons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href={`${props.staticUrl}/assets/icons/favicon-96x96.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${props.staticUrl}/assets/icons/favicon-16x16.png`}
      />
      <link
        rel="manifest"
        href={`${props.staticUrl}/assets/icons/manifest.json`}
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content={`${props.staticUrl}/assets/icons/ms-icon-144x144.png`}
      />
      <meta name="theme-color" content="#ffffff" />
    </head>
  );
}

function mapStateToProps(state) {
  return {
    staticUrl: state.config.staticUrl,
    meta: state.meta
  };
}

Head.propTypes = {
  staticUrl: PropTypes.string,
  meta: PropTypes.shape({}) // eslint-disable-line react/no-unused-prop-types
};

export default connect(mapStateToProps)(Head);
