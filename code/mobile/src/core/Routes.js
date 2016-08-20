import React, {Component} from 'react';
import {Actions, Router, Scene, Modal} from 'react-native-router-flux';
import {connect} from 'react-redux';

import Loading from '../scenes/Loading';
import Login from '../scenes/Authentication/Login';
import RegisterForm from '../scenes/Authentication/RegisterForm';
import Settings from '../scenes/Settings';
import Filters from '../scenes/Filters';
import ProcoModal from '../components/ProcoModal';
import MainScreen from '../scenes/Main';
import UpdateYourQuestionScreen from '../components/UpdateYourQuestionScreen';
import ShootNewProfileScreen from '../components/ShootNewProfileScreen';

const scenes = Actions.create(
  <Scene key="modal" component={Modal}>

    <Scene key="root">


      <Scene key="LoginPage" component={Login} initial={false} hideNavBar={true} />
      <Scene key="RegisterForm" component={RegisterForm} hideNavBar={true} />

      <Scene key="MainScreen" hideNavBar={true} component={MainScreen} initial={true} />


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
    <Scene key="ProcoModal" component={ProcoModal} />
  </Scene>
);


class Routes extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <Router scenes={scenes}/>;
  }
}

export default Routes;
