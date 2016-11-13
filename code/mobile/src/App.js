import React, { Component } from "react";
import { View } from "react-native";
import InAppAlert from "./components/InAppAlert";
import NoInternetModal from "./components/NoInternetModal";
import Routes from "./scenes";

import colors from './core/style/colors';

class App extends Component {

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.primary1}}>
        <NoInternetModal />

        <Routes />

        <InAppAlert />
      </View>
    );
  }
}

export default App;
