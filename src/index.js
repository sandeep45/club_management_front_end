import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import App from './js/containers/App/'
import store, { history } from './store.js'
import * as WebUtil from './js/web_util/'
import * as reducers from './js/reducers'
import * as action_creators from './js/action_creators'
import merge from 'lodash/merge'
import Instascan from 'instascan'

import registerServiceWorker from './registerServiceWorker';

import './css/index.css';

window.store = store; // ONLY FOR DEBUGGING
window.WebUtil = WebUtil; // ONLY FOR DEBUGGING
window.reducers = reducers; // ONLY FOR DEBUGGING
window.action_creators = action_creators; // ONLY FOR DEBUGGING
window.merge = merge; // ONLY FOR DEBUGGING
window.Instascan = Instascan; // ONLY FOR DEBUGGING
const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route component={App} />
    </ConnectedRouter>
  </Provider>,
  target
);

registerServiceWorker();
