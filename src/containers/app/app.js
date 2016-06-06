import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
} from 'react-native';
import Intro from './../../components/intro/intro';

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
});

class App extends Component {
  configureScene(route) {
    if (route.name && route.name === 'Search') {
      return Navigator.SceneConfigs.FadeAndroid;
    }

    return Navigator.SceneConfigs.FloatFromBottomAndroid;
  }

  renderScene(route, navigator) {
    let Comp = route.component;

    return (
      <Comp
        name={route.name}
        navigator={navigator}
        route={route}
        {...route.passProps}
      />
    );
  }

  render() {
    return (
      <Navigator
        style={styles.navigator}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        initialRoute={{
          component: Intro,
          name: 'Intro',
        }}
      />
    );
  }
}

export default App;
