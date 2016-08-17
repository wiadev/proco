import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Login from '../../scenes/Login';
import RegisterForm from '../../scenes/RegisterForm';
import Settings from '../../scenes/Settings';
import WebViewModal from '../../scenes/WebViewModal';
import MainScreen from '../../components/MainScreen';
import UpdateYourQuestionScreen from '../../components/UpdateYourQuestionScreen';
import ShootNewProfileScreen from '../../components/ShootNewProfileScreen';
import DiscoverySettingsScreen from '../../components/DiscoverySettingsScreen';
import MessagesListScreen from '../../components/MessagesListScreen';
import TalkScreen from '../../components/TalkScreen';
import CameraPermissionScreen from '../../components/CameraPermissionScreen';
import AskQuestionPermissionScreen from '../../components/AskQuestionPermissionScreen';
import NotificationPermissionScreen from '../../components/NotificationPermissionScreen';
import ShootLoopPermissionScreen from '../../components/ShootLoopPermissionScreen';
import UpdateYourSchoolScreen from '../../components/UpdateYourSchoolScreen';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="Login" component={Login} hideNavBar={true} initial={false} />
    <Scene key="RegisterForm" component={RegisterForm} hideNavBar={true} initial={false} />
    <Scene
      key="Settings"
      component={Settings}
      hideNavBar={false}
      direction="vertical"
      initial={true}
      title="Settings"
    />
    <Scene key="WebViewModal" direction="vertical" hideNavBar={false}  component={WebViewModal}  />
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
      key="NotificationPermissionScreen"
      component={NotificationPermissionScreen}
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

@connect(
  state => ({
    auth: state.auth,
    user: state.user,
  }),
)
class Routes extends Component {

  constructor(props) {
    super(props);
  }

  isActiveUser(props = this.props) {
    return (props.auth.get('isLoggedIn') && props.user.get('network_email_is_verified'));
  }

  shouldComponentUpdate(nextProps)  {
    return (this.isActiveUser() !== this.isActiveUser(nextProps));
  }

  componentDidMount

  render() {
    return <Router scenes={scenes} />;
  }
}

export default Routes;
