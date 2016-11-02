import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Head from '../components/head/head';

export default function Root(props) {
  return (
    <Provider store={props.store}>
      <html lang="en-US">
        <Head />
        {props.children}
      </html>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired
};
