import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { get as _get } from 'lodash';

/*
import { canUseDOM } from 'exenv';
if (canUseDOM) {
  debugger;
}
*/

class Search extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (this.props.error === true) {
      return (
        <section className="search">
          <h1>{'We\'re sorry! There was an error. Message: '}</h1>
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
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  response: PropTypes.shape()
};

function mapStateToProps(state = {}) {
  return state.search;
}

export default connect(mapStateToProps)(Search);
