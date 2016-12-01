import React, { PropTypes } from 'react';

export default function Script({
  innerHtml, type, src
}) {
  if (innerHtml) {
    return (<script type={type} dangerouslySetInnerHTML={{ __html: innerHtml }} />); // eslint-disable-line react/no-danger, max-len
  }
  return (<script type={type} src={src} />);
}

Script.propTypes = {
  innerHtml: PropTypes.string,
  type: PropTypes.string,
  src: PropTypes.string
};

