import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash/clone';
import serialize from 'serialize-javascript';

class Config extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const clonedState = clone(this.props.state);
    const { initialPageLoad } = this.props.state.config;

    if (!initialPageLoad) {
      return {};
    }

    clonedState.config.initialQueryParams = serialize(
      clonedState.config.initialQueryParams,
      { isJSON: true }
    );
    const state = initialPageLoad ? serialize(clonedState) : '';

    /* eslint-disable react/no-danger */
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `/*<!--*/ \n
window.appState = ${state}; \n /*-->*/`
        }}
      />
    );
    /* eslint-enable react/no-danger */
  }
}

Config.propTypes = {
  state: PropTypes.shape({
    config: PropTypes.shape({
      initialPageLoad: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired
};

export default Config;
