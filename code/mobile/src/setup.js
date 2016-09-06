/* @flow */

import React, {Component} from "react";
import {AppState, View} from "react-native";
import {Provider} from "react-redux";
import {configureStore} from "./store/configureStore";
import codePush from "react-native-code-push";
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
      return (
        <View style={{
          flex: 1,
          backgroundColor: '#7A36AD',
        }}>
          {this.state.isLoading ? null :
            <Provider store={this.state.store}>
              <App />
            </Provider>
          }
        </View>
      )
    }
  }

  return codePush(Root);

};


export default setup;
