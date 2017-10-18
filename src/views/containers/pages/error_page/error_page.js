import React from 'react';
import PropTypes from 'prop-types';

import Footer from './../../../components/footer/footer';

function ErrorPage({ env, componentInfo, err }) {
  const isDevelopment = env === 'development';
  if (isDevelopment) {
    console.error(err); // eslint-disable-line no-console
    console.error(err.stack); // eslint-disable-line no-console
  }
  return (
    <div className="error-page">
      <h1>{`Error Occurred.`}</h1>
      {isDevelopment ? (
        <div>
          <h2>Error Message: {err.message}</h2>
          <h2>Error Stack: {JSON.stringify(err.stack, null, 2)}</h2>
          <h2>Component Info: {JSON.stringify(componentInfo, null, 2)}</h2>
        </div>
      ) : (
        <p>{`We're sorry please try again later.`}</p>
      )}
      <Footer />
    </div>
  );
}

ErrorPage.propTypes = {
  err: PropTypes.shape(),
  componentInfo: PropTypes.shape(),
  env: PropTypes.string.isRequired
};

ErrorPage.defaultProps = {
  err: {},
  componentInfo: {}
};

export default ErrorPage;
