import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/*
import { canUseDOM } from 'exenv';
if(canUseDOM) {
  debugger;
}
*/

class RepoDetail extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    if (this.props.error) {
      const errorMessage = 'We\'re sorry, please try again later.';
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
          <p>{`Watchers: ${repo.watchers_count}`}</p></section>
      </section>
    );
  }
}

function mapStateToProps(state = {}) {
  return state.repoDetail;
}

RepoDetail.propTypes = {
  repo: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default connect(mapStateToProps)(RepoDetail);
