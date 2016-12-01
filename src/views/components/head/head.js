import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { get as _get } from 'lodash';
import Helmet from 'react-helmet';

import Script from './script';
import Noscript from './noscript';

function ClientSideHead(initialPageLoad, attr) {
  if (!initialPageLoad) {
    return (<Helmet {...attr} />);
  }
  return null;
}

function Head(props) {
  const meta = _get(props, 'meta.meta') || [];
  const link = _get(props, 'meta.link') || [];
  const script = _get(props, 'meta.script') || [];
  const noscript = _get(props, 'meta.noscript') || [];
  const style = _get(props, 'meta.style') || [];
  const title = _get(props, 'meta.title');

  // On initial render Helmet has a bug: https://github.com/nfl/react-helmet/issues/98
  return (
    <head lang="en">
      <title>{title}</title>

      {meta.map(function createMetaTags(conf, index) {
        return <meta key={index} {...conf} />;
      })}

      <link href={`${props.staticUrl}/css/main.css`} rel="stylesheet" />

      {link.map(function createLinkTags(conf, index) {
        return <link key={index} {...conf} />;
      })}

      {script.map(function createScriptTags(conf, index) {
        return <Script key={index} {...conf} />;
      })}

      {noscript.map(function createNoScriptTags(conf, index) {
        return <Noscript key={index} {...conf} />;
      })}

      {style.map(function createStyleTags(conf, index) {
        return <Noscript key={index} {...conf} />;
      })}
      {ClientSideHead(props.initialPageLoad, { title, meta, link, script, noscript, style })}
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
  staticUrl: PropTypes.string,
  initialPageLoad: PropTypes.bool,
  meta: PropTypes.shape({}) // eslint-disable-line react/no-unused-prop-types
};

export default connect(mapStateToProps)(Head);
