import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.goToSearch = this.props.goToSearch.bind(this);
  }

  render() {
    // todo make this work with query params
    // https://github.com/reactjs/react-router/blob/master/examples/query-params/app.js
    return (
      <nav className="top-nav">
        <ul className="top-nav__link-container">
          <li className="top-nav__link">
            <Link to="/">react-ssr-spa</Link>

            <Link to="/about">About</Link>
          </li>
        </ul>
        <form
          className="top-nav__search-form"
          action="/search"
          method="GET"
          onSubmit={this.goToSearch}
        >
          <input
            className="top-nav__input"
            ref={searchQuery => {
              this.searchQuery = searchQuery;
            }}
            name="query"
            type="text"
            placeholder="Search"
          />
          <button
            className="top-nav__button"
            type="submit"
            onClick={this.goToSearch}
          >
            Search
          </button>
        </form>
      </nav>
    );
  }
}

Nav.propTypes = {
  goToSearch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    state
  };
}

// an example of how you would dispatch from a component
// import he action and dispatch it here:
// https://github.com/GetExpert/redux-blog-example/blob/f6e8a544a5f335091212086b5a24c905f7db145b/app/routes/Posts/List.js
function mapDispatchToProps(dispatch) {
  return {
    goToSearch(e) {
      e.preventDefault();
      const query = this.searchQuery.value;
      dispatch(push(`/search/${query}`));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
