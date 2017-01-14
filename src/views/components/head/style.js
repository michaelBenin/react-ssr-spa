import React, { PropTypes } from 'react';

export default function Style({
  innerHtml
}) {
  if (!innerHtml) {
    return null;
  }
  return (<style dangerouslySetInnerHTML={{ __html: innerHtml }} />); // eslint-disable-line react/no-danger, max-len
}

Style.propTypes = {
  innerHtml: PropTypes.string.isRequired
};

