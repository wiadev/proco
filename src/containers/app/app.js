import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Intro from './../../components/intro/intro';
import RegisterForm from './../../components/registerForm/registerForm';
import MainScreen from './../../components/mainScreen/mainScreen';

class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="intro" component={Intro} hideNavBar={true} initial={true} />
          <Scene key="registerForm" component={RegisterForm} hideNavBar={true} />
          <Scene key="mainScreen" component={MainScreen} hideNavBar={true} />
        </Scene>
      </Router>
    );
  }
}

export default App;
