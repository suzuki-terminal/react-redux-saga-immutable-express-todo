import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
require('bootstrap/dist/css/bootstrap.css');

import AppContainer from './containers/AppContainer';
import configureStore from './store';

const store = configureStore();

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
