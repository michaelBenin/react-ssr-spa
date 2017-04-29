import React from 'react';
import PropTypes from 'prop-types';

export default function Script({
  innerHtml, type, src
}) {
  if (innerHtml) {
    return (<script type={type} dangerouslySetInnerHTML={{ __html: innerHtml }} />); // eslint-disable-line react/no-danger, max-len
  }
  return (<script type={type} src={src} />);
}

Script.propTypes = {
  innerHtml: PropTypes.string, // eslint-disable-line react/require-default-props
  type: PropTypes.string.isRequired,
  src: PropTypes.string // eslint-disable-line react/require-default-props
};

