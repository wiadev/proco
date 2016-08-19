import React, {Component} from 'react';
import {Actions, Router, Scene, Modal} from 'react-native-router-flux';
import {connect} from 'react-redux';

import Loading from '../scenes/Loading';
import Login from '../scenes/Authentication/Login';
import RegisterForm from '../scenes/Authentication/RegisterForm';
import Settings from '../scenes/Settings';
import DiscoveryFilters from '../scenes/DiscoveryFilters';
import WebViewModal from '../scenes/WebViewModal';
import { Card, CardModal } from '../components/Card';
import Test from '../scenes/Test';
import MainScreen from '../scenes/Main';
import UpdateYourQuestionScreen from '../components/UpdateYourQuestionScreen';
import ShootNewProfileScreen from '../components/ShootNewProfileScreen';
import CameraPermissionScreen from '../components/CameraPermissionScreen';
import AskQuestionPermissionScreen from '../components/AskQuestionPermissionScreen';
import ShootLoopPermissionScreen from '../components/ShootLoopPermissionScreen';
import UpdateYourSchoolScreen from '../components/UpdateYourSchoolScreen';

const scenes = Actions.create(
  <Scene key="modal" component={Modal}>

    <Scene key="root">
      <Scene key="CardModal" hideNavBar={true} direction="vertical" component={CardModal}/>
      <Scene key="Card" hideNavBar={true} direction="vertical" component={Card}/>
      <Scene key="WebViewModal" direction="vertical" hideNavBar={false} component={WebViewModal}/>

      <Scene key="LoginPage" component={Login} initial={true} hideNavBar={true} />
      <Scene key="RegisterForm" component={RegisterForm} hideNavBar={true} />

      <Scene key="MainScreen" hideNavBar={true} component={MainScreen} initial={true} />
      <Scene
        key="Settings"
        component={Settings}
        hideNavBar={false}
        direction="vertical"
        initial={false}
        title="Settings"
      />
      <Scene
        key="DiscoveryFilters"
        component={DiscoveryFilters}
        hideNavBar={false}
        direction="vertical"
        initial={false}
        title="Discovery Filters"
      />


      <Scene key="Test" direction="vertical" hideNavBar={true} initial={false} component={Test}/>
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
