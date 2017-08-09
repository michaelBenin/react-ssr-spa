import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import loadData from './search_results_data_fetch';

// eslint-disable-next-line react/prefer-stateless-function
class Search extends Component {
  componentWillMount() {
    if (!this.props.state.config.initialPageLoad) {
      loadData(this.props.match, this.props.dispatch, this.props.state);
    } else {
      // TODO: warm cache for PWA, don't trigger render
    }
  }

  render() {
    if (this.props.error === true) {
      return (
        <section className="search">
          <h1>{"We're sorry! There was an error. Message: "}</h1>
          <p>{this.props.errorMessage}</p>
        </section>
      );
    }

    if (this.props.isLoading === true) {
      return (
        <section className="search">
          <h1>Be Patient, we are loading in the search results.</h1>
        </section>
      );
    }

    return (
      <section className="search">
        <ul>
          {this.props.response.items.map(function mapItems(item) {
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
      </section>
    );
  }
}

Search.propTypes = {
  match: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool.isRequired, // eslint-disable-line react/require-default-props
  error: PropTypes.bool, // eslint-disable-line react/require-default-props
  errorMessage: PropTypes.string, // eslint-disable-line react/require-default-props
  response: PropTypes.shape() // eslint-disable-line react/require-default-props
};

Search.defaultProps = {
  isLoading: true,
  error: false
};

function mapStateToProps(state = {}) {
  return {
    isLoading: state.search.isLoading,
    response: state.search.response,
    state
  };
}

export default withRouter(connect(mapStateToProps)(Search));
