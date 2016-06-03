import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
} from 'react-native';

import helloWorld from './../../components/helloWorld/helloWorld';

class App extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    let component = route.component;

    return (
      <component navigator={navigator} route={route} />
    );
  }

  configureScene(route) {
    if (route.name && route.name === 'Search') {
      return Navigator.SceneConfigs.FadeAndroid;
    } else {
      return Navigator.SceneConfigs.FloatFromBottomAndroid;
    }
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        style={styles.navigator}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        initialRoute={{
          component: helloWorld,
          name: 'HelloWorld',
        }}
      />
    );
  }
}

let styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
});

export default App;
