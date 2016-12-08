import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Config extends Component {
  createConfig() {
    return {
      __html: this.props.state
    };
  }

  render() {
    if (!this.props.initialPageLoad) {
      return null;
    }

    return (
      <script
        className="client-config"
        type="application/json"
        dangerouslySetInnerHTML={this.createConfig()} // eslint-disable-line react/no-danger
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
