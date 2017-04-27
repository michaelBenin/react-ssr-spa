import React, { Component, PropTypes } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

import Header from './../../components/header/header';
import Footer from './../../components/footer/footer';
import Config from './../../components/config/config';

class Layout extends Component {

  livereload() {
    if (this.props.env === 'development') {
      return <script src="//localhost:35729/livereload.js" async />;
    }
    return '';
  }

  scriptbundle() {
    if (this.props.env === 'development') {
      // return <script src="/js/bundle.js" async></script>;
      return <script src="//localhost:3001/static/bundle.js" async />;
    }
    return <script src={`${this.props.staticUrl}/js/bundle.js`} async />;
  }

  render() {
    return (
      <body className="layout">
        <Header />
        <section className="main" role="main">
          {renderRoutes(this.props.route.routes)}
        </section>
        <Footer />
        <Config />
        {this.livereload()}
        {this.scriptbundle()}
      </body>
    );
  }
}

function mapStateToProps(state) {
  return {
    env: state.config.env,
    staticUrl: state.config.staticUrl
  };
}

Layout.propTypes = {
  route: PropTypes.arrayOf(PropTypes.shape({})),
  env: PropTypes.string.isRequired,
  staticUrl: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Layout);
