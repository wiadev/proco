/* @flow */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import codePush from "react-native-code-push";
import store from '../../store/configureStore';
import App from '../app/app';
import API from '../../api';

class Root extends Component {
  componentWillMount() {
    API.Initiliazer();
  }
  componentDidMount() {
    codePush.sync();
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
