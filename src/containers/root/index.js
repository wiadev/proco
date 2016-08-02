/* @flow */

import React, { Component } from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import store from '../../store/configureStore';
import App from '../app';
import API from '../../api';

class Root extends Component {

  componentDidMount() {
    AppState.addEventListener('change', API.handleAppStateChange);

    API.handleAppStateChange('active'); // For the first load
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', API.handleAppStateChange);
  }
  
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
