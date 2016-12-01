import React, { PropTypes } from 'react';

export default function Noscript({
  innerHtml
}) {
  if (!innerHtml) {
    return null;
  }
  return (<noscript dangerouslySetInnerHTML={{ __html: innerHtml }} />); // eslint-disable-line react/no-danger, max-len
}

Noscript.propTypes = {
  innerHtml: PropTypes.string
};

