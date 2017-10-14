import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import ErrorBoundary from 'react-error-boundary';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import Header from './../../components/header/header';
import Footer from './../../components/footer/footer';
import Config from './../../components/config/config';
import log from '../../../services/logger_service';

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

        <ErrorBoundary
          onError={(error, componentStack) => {
            log.error(componentStack, error);
          }}
          fallbackcomponent={<div>Error</div>}
        >
          <TransitionGroup className="main" role="main">
            <CSSTransition
              key={this.props.location.key}
              timeout={1000}
              enter={true}
              exit={true}
              classNames="pageSlider"
              mountOnEnter={true}
              unmountOnExit={true}
            >
              {renderRoutes(this.props.route.routes)}
            </CSSTransition>
          </TransitionGroup>
        </ErrorBoundary>
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
  route: PropTypes.shape({
    routes: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  env: PropTypes.string.isRequired,
  staticUrl: PropTypes.string.isRequired,
  location: PropTypes.shape({
    key: PropTypes.string
  }).isRequired
};

Layout.defaultProps = {
  route: {
    routes: []
  },
  env: 'development',
  staticUrl: '/'
};

export default connect(mapStateToProps)(Layout);
