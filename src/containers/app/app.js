import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Intro from './../../components/intro/intro';
import RegisterForm from './../../components/registerForm/registerForm';

class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="intro" component={Intro} hideNavBar={true} initial={true} />
          <Scene key="registerForm" component={RegisterForm}
            hideNavBar={false}
            navigationBarStyle={RegisterForm.getStyles().navBar}
            rightButtonTextStyle={RegisterForm.getStyles().rightButtonTextStyle}
            renderBackButton={RegisterForm.onRenderBackButton}
            rightTitle={'Next'}
            onRight={::RegisterForm.onRightClick} />
        </Scene>
      </Router>
    );
  }
}

export default App;
