/* @flow */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../store/configureStore';
import App from '../app/app';

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
