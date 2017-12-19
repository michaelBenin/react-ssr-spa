import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import Script from './script';
import Noscript from './noscript';
import Style from './style';

function ClientSideHead(initialPageLoad, attr) {
  if (!initialPageLoad) {
    return <Helmet {...attr} />;
  }
  return null;
}

function Head(props) {
  const meta = get(props, 'meta.meta') || [];
  const link = get(props, 'meta.link') || [];
  const script = get(props, 'meta.script') || [];
  const noscript = get(props, 'meta.noscript') || [];
  const style = get(props, 'meta.style') || [];
  const title = get(props, 'meta.title');

  // On initial render Helmet has a bug: https://github.com/nfl/react-helmet/issues/98
  return (
    <head lang="en">
      <title>{title}</title>
      <meta charSet="utf-8" />
      {meta.map(function createMetaTags(conf) {
        return <meta key={JSON.stringify(conf)} {...conf} />;
      })}

      <link href={`${props.staticUrl}/css/main.css`} rel="stylesheet" />

      {link.map(function createLinkTags(conf) {
        return <link key={JSON.stringify(conf)} {...conf} />;
      })}

      {script.map(function createScriptTags(conf) {
        return <Script key={JSON.stringify(conf)} {...conf} />;
      })}

      {noscript.map(function createNoScriptTags(conf) {
        return <Noscript key={JSON.stringify(conf)} {...conf} />;
      })}

      {style.map(function createStyleTags(conf) {
        return <Style key={JSON.stringify(conf)} {...conf} />;
      })}
      {ClientSideHead(props.initialPageLoad, {
        title,
        meta,
        link,
        script,
        noscript,
        style
      })}
    </head>
  );
}

function mapStateToProps(state) {
  return {
    staticUrl: state.config.staticUrl,
    meta: state.meta,
    initialPageLoad: state.config.initialPageLoad
  };
}

Head.propTypes = {
  staticUrl: PropTypes.string, // eslint-disable-line react/require-default-props
  initialPageLoad: PropTypes.bool, // eslint-disable-line react/require-default-props
  meta: PropTypes.shape({}) // eslint-disable-line react/require-default-props, react/no-unused-prop-types
};

export default connect(mapStateToProps)(Head);
