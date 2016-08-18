/* @flow */

import React, { Component } from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import App from './App';
import * as firebase from 'firebase';

const setup = () => {

  console.log("running setup");
  firebase.initializeApp({
    apiKey: 'AIzaSyDtebbExST_vz3cMMy_YLdIrNNKohIGlNc',
    authDomain: 'hello-4c376.firebaseapp.com',
    storageBucket: 'hello-4c376.appspot.com',
    databaseURL: 'https://hello-4c376.firebaseio.com',
  });

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
