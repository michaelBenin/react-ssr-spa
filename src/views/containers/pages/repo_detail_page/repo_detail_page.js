import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// eslint-disable-next-line react/prefer-stateless-function
class RepoDetail extends Component {
  render() {
    if (this.props.error) {
      const errorMessage = "We're sorry, please try again later.";
      return (
        <section className="repo-detail-page">
          <article className="repo-detail-page__main">
            <h1>{errorMessage}</h1>
            <p>{this.props.errorMessage}</p>
          </article>
        </section>
      );
    }

    if (this.props.isLoading) {
      return (
        <section className="repo-detail-page">
          <article className="repo-detail-page__main">
            <h1>Loading...</h1>
          </article>
        </section>
      );
    }

    const { repo } = this.props;
    return (
      <section className="repo-detail-page">
        <article className="repo-detail-page__main">
          <h1>{repo.name}</h1>
          <p>{repo.description}</p>
          <img src={repo.owner.avatar_url} alt="owner" />
        </article>
        <section className="repo-detail-page__sidebar">
          <cite>{`Owner: ${repo.owner.login}`}</cite>
          <p>{`Stars: ${repo.stargazers_count}`}</p>
          <p>{`Watchers: ${repo.watchers_count}`}</p>
        </section>
      </section>
    );
  }
}

function mapStateToProps(state = {}) {
  return state.repoDetail;
}

RepoDetail.propTypes = {
  repo: PropTypes.shape({}), // eslint-disable-line react/require-default-props
  isLoading: PropTypes.bool, // eslint-disable-line react/require-default-props
  error: PropTypes.bool, // eslint-disable-line react/require-default-props
  errorMessage: PropTypes.string // eslint-disable-line react/require-default-props
};

export default connect(mapStateToProps)(RepoDetail);
