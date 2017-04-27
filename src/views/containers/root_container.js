import React, {Component, PropTypes} from 'react';
import {renderRoutes} from 'react-router-config';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';
import { getRoutesWithStore } from '../../react_router/react_router';
import Head from '../components/head/head';

class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <html lang="en-US">
          <Head />
          {renderRoutes(getRoutesWithStore(this.props.store))}
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
