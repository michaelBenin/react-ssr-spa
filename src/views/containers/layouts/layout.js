import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { renderRoutes } from 'react-router-config';
import Switch from 'react-router/Switch';
import Route from 'react-router/Route';
import { connect } from 'react-redux';
import ErrorBoundary from 'react-error-boundary';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import Header from './../../components/header/header';
import Footer from './../../components/footer/footer';
import Config from './../../components/config/config';
import log from '../../../services/logger_service';

const renderRoutes = (routes, location) =>
  routes ? (
    <Switch key={location.key} location={location}>
      {routes.map(route => (
        <Route
          key={location.key}
          location={location}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          component={route.component}
        />
      ))}
    </Switch>
  ) : null;

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
          <TransitionGroup
            enter={true}
            exit={true}
            appear={true}
            className="main"
            role="main"
            component={'main'}
          >
            <CSSTransition
              key={Math.random()}
              classNames="fadeTranslate"
              timeout={1000}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              {renderRoutes(this.props.route.routes, this.props.location)}
            </CSSTransition>
          </TransitionGroup>
          <Footer />
        </ErrorBoundary>
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
