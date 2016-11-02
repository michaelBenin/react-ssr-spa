// https://raw.githubusercontent.com/reactjs/react-router-redux/master/examples/server/store.js
import { createStore, compose, applyMiddleware } from 'redux';
// https://github.com/gaearon/redux-thunk
import thunk from 'redux-thunk';

import { routerMiddleware } from 'react-router-redux';

import reducer from '../reducers';

export let store = {}; // eslint-disable-line import/no-mutable-exports

export function configureStore(history, initialState = {}) {
  store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(routerMiddleware(history)),
      applyMiddleware(thunk)
    )
  );
  return store;
}
