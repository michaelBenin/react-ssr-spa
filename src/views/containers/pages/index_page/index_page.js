import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';
import Link from 'react-router-dom/Link';

import loadData from './index_page_data_fetch';

import Footer from './../../../components/footer/footer';

class Homepage extends Component {
  componentWillMount() {
    if (!get(this.props, 'state.config.initialPageLoad')) {
      loadData(this.props.match, this.props.dispatch, this.props.state);
    } else {
      // TODO: warm cache for PWA, don't trigger render
    }
  }

  render() {
    return (
      <div className="index-page">
        <h1>Welcome to react-ssr-spa working demo.</h1>
        <Link to="/repo/michaelBenin/react-ssr-spa">demo: react-ssr-spa</Link>
        <Footer />
      </div>
    );
  }
}

Homepage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({}).isRequired
};

Homepage.defaultProps = {};

function mapStateToProps(state = {}) {
  return {
    state
  };
}

export default withRouter(connect(mapStateToProps)(Homepage));
