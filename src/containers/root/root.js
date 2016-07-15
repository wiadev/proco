/* @flow */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../store/configureStore';
import App from '../app/app';
import API from '../../api';

class Root extends Component {

  componentDidMount() {
    API.Initiliazer();
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
