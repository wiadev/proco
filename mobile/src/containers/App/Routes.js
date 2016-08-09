import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Login from './../../scenes/Login';
import RegisterForm from '../../scenes/RegisterForm';
/*import MainScreen from './../../components/mainScreen/mainScreen';
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
*/

const newUserScenes = Actions.create(
  <Scene key="root">
    <Scene key="Login" component={Login} hideNavBar={true} initial={false} />
    <Scene key="RegisterForm" component={RegisterForm} hideNavBar={true} initial={false} />
  </Scene>
);

const activeUserScenes = Actions.create(
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

  render() {

    return (
      <Router>
        {this.isActiveUser() ? activeUserScenes() : newUserScenes()}
      </Router>
    );
  }
}

export default Routes;
