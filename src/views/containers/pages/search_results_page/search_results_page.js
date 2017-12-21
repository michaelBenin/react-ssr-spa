import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import withRouter from 'react-router/withRouter';
import get from 'lodash/get';

import loadData from './search_results_data_fetch';
import Footer from './../../../components/footer/footer';

class Search extends Component {
  static loadData(nextState, dispatch, state) {
    return loadData(nextState, dispatch, state);
  }

  componentWillMount() {
    if (
      !get(this.props, 'state.config.initialPageLoad') ||
      !this.props.isLoading
    ) {
      loadData(this.props.match, this.props.dispatch, this.props.state);
    }
    /*
     // TODO: warm cache for PWA, don't trigger render
     if(get(this.props, 'state.config.initialPageLoad')) {
       const CACHE_WARM = true;
       loadData(
         this.props.match,
         this.props.dispatch,
         this.props.state,
         CACHE_WARM
       );
     }
    */
  }

  /*
  componentDidCatch(error, info) {
    // log.error(error, info);
    // this.setState({error});
  }
  */

  render() {
    if (this.props.error === true) {
      return (
        <section key="search" className="search">
          <h1>We're sorry! There was an error. Message: </h1>
          <p>{this.props.errorMessage}</p>
          <Footer />
        </section>
      );
    }

    if (this.props.isLoading === true || this.props.isLoading === undefined) {
      return (
        <section key="search" className="search">
          <h1>Be Patient, we are loading in the search results.</h1>
          <Footer />
        </section>
      );
    }

    return (
      <section key="search" className="search">
        <ul>
          {get(this.props.response, 'items', []).map(function mapItems(item) {
            return (
              <li key={`${item.owner.login}|${item.name}`}>
                <Link to={`/repo/${item.owner.login}/${item.name}`}>
                  <h3>{item.name}</h3>
                  <cite>{item.owner.login}</cite>
                  <img src={item.owner.avatar_url} alt="Name" />
                </Link>
              </li>
            );
          })}
        </ul>
        <Footer />
      </section>
    );
  }
}

Search.propTypes = {
  match: PropTypes.shape({}).isRequired,
  state: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool, // eslint-disable-line react/require-default-props
  error: PropTypes.bool, // eslint-disable-line react/require-default-props
  errorMessage: PropTypes.string, // eslint-disable-line react/require-default-props
  response: PropTypes.shape({}) // eslint-disable-line react/require-default-props
};

Search.defaultProps = {
  error: false,
  response: {
    items: []
  }
};

const mapStateToProps = (state = {}) => ({
  isLoading: state.search.isLoading,
  response: state.search.response,
  state
});

export default withRouter(connect(mapStateToProps)(Search));
