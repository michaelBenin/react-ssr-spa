import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import get from 'lodash/get';
import { flushSearch } from '../../../../redux/action_creators/search/search_action_creators';
import loadData from './search_results_data_fetch';

import Footer from './../../../components/footer/footer';

// eslint-disable-next-line react/prefer-stateless-function
class Search extends Component {
  componentWillMount() {
    if (
      !get(this.props, 'state.config.initialPageLoad') ||
      this.props.isLoading === undefined ||
      this.props.isLoading === false
    ) {
      this.props.loadData(this.props.match, this.props.state);
    } else {
      // TODO: warm cache for PWA, don't trigger render
    }
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
  loadData: PropTypes.func.isRequired,
  state: PropTypes.shape({}).isRequired,
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

const mapDispatchToProps = dispatch => ({
  flushSearch() {
    dispatch(flushSearch());
  },
  loadData(match, state) {
    loadData(match, dispatch, state);
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
