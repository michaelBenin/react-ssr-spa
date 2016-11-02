import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Config extends Component {
  createConfig() {
    return {
      __html: this.props.state
    };
  }

  render() {
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
  state: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    state: JSON.stringify(state)
  };
}

export default connect(mapStateToProps)(Config);
