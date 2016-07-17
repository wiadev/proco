import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Intro from './../../components/intro/intro';
import RegisterForm from './../../components/registerForm/registerForm';
import MainScreen from './../../components/mainScreen/mainScreen';
import updateYourQuestionScreen from './../../components/updateYourQuestionScreen/updateYourQuestionScreen';
import shootNewProfileScreen from './../../components/shootNewProfileScreen/shootNewProfileScreen';
import discoverySettingsScreen from './../../components/discoverySettingsScreen/discoverySettingsScreen';
import moreSettingsScreen from './../../components/moreSettingsScreen/moreSettingsScreen';
import messagesListScreen from './../../components/messagesListScreen/messagesListScreen';
import talkScreen from './../../components/talkScreen/talkScreen';
import cameraPermissionScreen from './../../components/cameraPermissionScreen/cameraPermissionScreen';
import askQuestionPermissionScreen from './../../components/askQuestionPermissionScreen/askQuestionPermissionScreen';
import notificationPermissionScreen from './../../components/notificationPermissionScreen/notificationPermissionScreen';
import shootLoopPermissionScreen from './../../components/shootLoopPermissionScreen/shootLoopPermissionScreen';

class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="intro" component={Intro} hideNavBar={true} initial={false} />
          <Scene key="registerForm" component={RegisterForm} hideNavBar={true} initial={false} />
          <Scene key="mainScreen" component={MainScreen} hideNavBar={true} initial={true} />
          <Scene
            key="updateYourQuestionScreen"
            component={updateYourQuestionScreen}
            hideNavBar={true}
            initial={false}
          />
          <Scene
            key="shootNewProfileScreen"
            component={shootNewProfileScreen}
            hideNavBar={true}
            initial={false}
          />
          <Scene
            key="discoverySettingsScreen"
            component={discoverySettingsScreen}
            hideNavBar={true}
            initial={false}
          />
          <Scene
            key="moreSettingsScreen"
            component={moreSettingsScreen}
            hideNavBar={true}
            initial={false}
          />
          <Scene
            key="messagesListScreen"
            component={messagesListScreen}
            hideNavBar={true}
            initial={false}
          />
          <Scene
            key="talkScreen"
            component={talkScreen}
            hideNavBar={true}
            initial={false}
          />
          <Scene
            key="cameraPermissionScreen"
            component={cameraPermissionScreen}
            hideNavBar={true}
            initial={false}
          />
          <Scene
            key="askQuestionPermissionScreen"
            component={askQuestionPermissionScreen}
            hideNavBar={true}
            initial={false}
          />
          <Scene
            key="notificationPermissionScreen"
            component={notificationPermissionScreen}
            hideNavBar={true}
            initial={false}
          />
          <Scene
            key="shootLoopPermissionScreen"
            component={shootLoopPermissionScreen}
            hideNavBar={true}
            initial={false}
          />
        </Scene>
      </Router>
    );
  }
}

export default App;
