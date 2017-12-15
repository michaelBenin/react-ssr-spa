import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clone from 'lodash/clone';
import serialize from 'serialize-javascript';

class Config extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    if (!this.props.initialPageLoad) {
      return null;
    }

    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `/*<!--*/ \n
window.appState = ${this.props.state}; \n /*-->*/`
        }}
      />
    );
  }
}

Config.propTypes = {
  state: PropTypes.string.isRequired,
  initialPageLoad: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const clonedState = clone(state);
  const { initialPageLoad } = state.config;
  clonedState.config.initialQueryParams = serialize(
    clonedState.config.initialQueryParams,
    { isJSON: true }
  );
  const currentState = initialPageLoad ? JSON.stringify(clonedState) : '';
  return {
    state: currentState,
    initialPageLoad
  };
}

export default connect(mapStateToProps)(Config);
