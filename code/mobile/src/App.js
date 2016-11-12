import React, { Component } from "react";
import { AppState, NetInfo, View, StatusBar, Linking } from "react-native";
import { connect } from "react-redux";
import InAppAlert from "./components/InAppAlert";
import { syncPermissions, updateNotificationToken } from "./modules/Permissions/actions";
import NoInternetModal from "./components/NoInternetModal";
import BlockedUserModal from "./components/BlockedUserModal";
import Loading from "./components/Loading";
import FCM from "react-native-fcm";
import Routes from "./scenes";

class App extends Component {

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#7A36AD',
      }}>
        <NoInternetModal />
        <Routes />
      </View>
    );
  }
}

export default App;
