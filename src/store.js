import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
// import createHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'

import myRootReducer from './js/reducers'

export const history = createHashHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk,
  routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  myRootReducer,
  initialState,
  composedEnhancers
);

export default store;



