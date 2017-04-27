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
        data-state={this.props.data}
      />
    );
  }
}

Config.propTypes = {
  data: PropTypes.string.isRequired,
  initialPageLoad: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const { initialPageLoad } = state.config;
  const data = (initialPageLoad ? JSON.stringify(state) : '');
  return {
    data,
    initialPageLoad
  };
}

export default connect(mapStateToProps)(Config);
