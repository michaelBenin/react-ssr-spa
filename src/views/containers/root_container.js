import React, {Component, PropTypes} from 'react';
import {Route} from 'react-router';
import {matchRoutes, renderRoutes} from 'react-router-config';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';
import { getRoutesWithStore } from '../../react_router/react_router';
import Head from '../components/head/head';
import Layout from '../containers/layouts/layout';

class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <html lang="en-US">
          <Head />
          <Layout>
            {renderRoutes(getRoutesWithStore(this.props.store))}
          </Layout>
          </html>
        </ConnectedRouter>
      </Provider>
    );
  }
}


Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
};

export default Root;
