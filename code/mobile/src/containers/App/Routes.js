import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Login from '../../scenes/Login';
import RegisterForm from '../../scenes/RegisterForm';
import Settings from '../../scenes/Settings';
import WebViewModal from '../../scenes/WebViewModal';
import Card from '../../scenes/Card';
import Test from '../../scenes/Test';
import MainScreen from '../../components/MainScreen';
import UpdateYourQuestionScreen from '../../components/UpdateYourQuestionScreen';
import ShootNewProfileScreen from '../../components/ShootNewProfileScreen';
import DiscoverySettingsScreen from '../../components/DiscoverySettingsScreen';
import MessagesListScreen from '../../components/MessagesListScreen';
import TalkScreen from '../../components/TalkScreen';
import CameraPermissionScreen from '../../components/CameraPermissionScreen';
import AskQuestionPermissionScreen from '../../components/AskQuestionPermissionScreen';
import ShootLoopPermissionScreen from '../../components/ShootLoopPermissionScreen';
import UpdateYourSchoolScreen from '../../components/UpdateYourSchoolScreen';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="Login" hideNavBar={true} initial={false}>
      <Scene key="LoginPage" component={Login} />
      <Scene key="RegisterForm" component={RegisterForm} hideNavBar={true} />
    </Scene>
    <Scene
      key="Settings"
      component={Settings}
      hideNavBar={false}
      direction="vertical"
      initial={false}
      title="Settings"
    />
    <Scene key="WebViewModal" direction="vertical" hideNavBar={false}  component={WebViewModal}  />
    <Scene key="Card" direction="vertical" hideNavBar={true} initial={false} component={Card}  />
    <Scene key="Test" direction="vertical" hideNavBar={true} initial={false} component={Test}  />
    <Scene key="MainScreen" component={MainScreen} hideNavBar={true} initial={false} />
    <Scene
      key="UpdateYourQuestionScreen"
      component={UpdateYourQuestionScreen}
      hideNavBar={true}
      initial={false}
    />
    <Scene
      key="ShootNewProfileScreen"
      component={ShootNewProfileScreen}
      hideNavBar={true}
      initial={false}
    />
    <Scene
      key="DiscoverySettingsScreen"
      component={DiscoverySettingsScreen}
      hideNavBar={true}
      direction="vertical"
      initial={false}
    />
    <Scene
      key="MessagesListScreen"
      component={MessagesListScreen}
      hideNavBar={true}
      direction="vertical"
      initial={false}
    />
    <Scene
      key="TalkScreen"
      component={TalkScreen}
      hideNavBar={true}
      initial={false}
    />
    <Scene
      key="CameraPermissionScreen"
      component={CameraPermissionScreen}
      hideNavBar={true}
      initial={false}
    />
    <Scene
      key="AskQuestionPermissionScreen"
      component={AskQuestionPermissionScreen}
      hideNavBar={true}
      initial={false}
    />
    <Scene
      key="ShootLoopPermissionScreen"
      component={ShootLoopPermissionScreen}
      hideNavBar={true}
      initial={false}
    />
    <Scene
      key="UpdateYourSchoolScreen"
      component={UpdateYourSchoolScreen}
      hideNavBar={true}
      initial={false}
    />
  </Scene>
);


class Routes extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <Router scenes={scenes} />;
  }
}

export default Routes;
