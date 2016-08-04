/* @flow */

import React, { Component } from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import App from './containers/App';
import { FirebaseInit } from './core/Api';

const setup = () => {
  FirebaseInit();

  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({isLoading: false})),
      };
    }

    render() {
      if (this.state.isLoading) {
        return null;
      }
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
};


export default setup;
