import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import getRoutesWithStore from '../../react_router/react_router';
import Head from '../components/head/head';

function Root({ store, history }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <html lang="en-US">
          <Head />
          {renderRoutes(getRoutesWithStore(store))}
        </html>
      </ConnectedRouter>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
};

export default Root;
