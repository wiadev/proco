/* @flow */

import React, {Component} from "react";
import {AppState, View} from "react-native";
import {Provider} from "react-redux";
import {configureStore} from "./store/configureStore";
import startLocationTracking from "./modules/Location/tracker";
import App from "./App";

const setup = () => {

  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: false,
        store: configureStore(),
      };
      startLocationTracking(this.state.store);
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

  return Root;

};


export default setup;
