import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

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
import updateYourSchoolScreen from './../../components/updateYourSchoolScreen/updateYourSchoolScreen';

@connect(
  state => ({ auth: state.auth }),
)
class App extends Component {

  constructor(props) {
    super(props);
  }

  isActiveUser(auth = this.props.auth) {
    return (auth.get('isLoaded') && auth.get('isLoggedIn') && auth.get('isBoarded'));
  }

  shouldComponentUpdate(nextProps)  {
    return (this.isActiveUser() !== this.isActiveUser(nextProps.auth));
  }

  render() {

    const newUserScenes = () => (
      <Scene key="root">
        <Scene key="intro" component={Intro} hideNavBar={true} initial={false} />
        <Scene key="registerForm" component={RegisterForm} hideNavBar={true} initial={false} />
      </Scene>
    );

    const activeUserScenes = () => (
      <Scene key="activeUserRoot">
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
          direction="vertical"
          initial={false}
        />
        <Scene
          key="moreSettingsScreen"
          component={moreSettingsScreen}
          hideNavBar={true}
          direction="vertical"
          initial={false}
        />
        <Scene
          key="messagesListScreen"
          component={messagesListScreen}
          hideNavBar={true}
          direction="vertical"
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
        <Scene
          key="updateYourSchoolScreen"
          component={updateYourSchoolScreen}
          hideNavBar={true}
          initial={false}
        />
      </Scene>
    );

    return (
      <Router>
        {this.isActiveUser() ? activeUserScenes() : newUserScenes()}
      </Router>
    );
  }
}

export default App;
