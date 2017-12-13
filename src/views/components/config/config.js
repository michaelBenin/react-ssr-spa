import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import omit from 'lodash/omit';
import clone from 'lodash/clone';

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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `document.addEventListener("DOMContentLoaded", function() {
window.startApp(${this.props.state});});`
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
  // clonedState.config = omit(clonedState.config, ['criticalCss']);
  const currentState = initialPageLoad ? JSON.stringify(clonedState) : '';
  return {
    state: currentState,
    initialPageLoad
  };
}

export default connect(mapStateToProps)(Config);
