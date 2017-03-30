import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Config extends Component {

  render() {
    if (!this.props.initialPageLoad) {
      return null;
    }

    return (
      <script
        className="client-config"
        type="application/json"
        charSet="UTF-8"
        data-state={this.props.state}
      />
    );
  }
}

Config.propTypes = {
  state: PropTypes.string.isRequired,
  initialPageLoad: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { initialPageLoad } = state.config;
  const currentState = (initialPageLoad ? JSON.stringify(state) : '');
  return {
    state: currentState,
    initialPageLoad
  };
}

export default connect(mapStateToProps)(Config);
