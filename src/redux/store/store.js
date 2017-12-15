// https://raw.githubusercontent.com/reactjs/react-router-redux/master/examples/server/store.js
import { createStore, compose, applyMiddleware } from 'redux';
// https://github.com/gaearon/redux-thunk
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducers';

export default function configureStore(history, initialState = {}, env) {
  let store = {}; // eslint-disable-line import/no-mutable-exports

  // eslint-disable-next-line no-param-reassign
  initialState.config.initialQueryParams = JSON.parse(
    initialState.config.initialQueryParams
  );

  if (env !== 'development') {
    store = createStore(
      reducer,
      initialState,
      compose(
        applyMiddleware(routerMiddleware(history)),
        applyMiddleware(thunk)
      )
    );
  } else {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle, max-len
    store = createStore(
      reducer,
      initialState,
      composeEnhancers(
        applyMiddleware(routerMiddleware(history)),
        applyMiddleware(thunk)
      )
    );
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
