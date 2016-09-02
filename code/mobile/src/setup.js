/* @flow */

import React, {Component} from "react";
import {AppState} from "react-native";
import {Provider} from "react-redux";
import {configureStore} from "./store/configureStore";
import {base} from "./core/Api";
import App from "./App";

const setup = () => {

  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: false,
        store: configureStore(),
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
