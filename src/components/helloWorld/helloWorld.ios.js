import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import HelloWorldComponent from './helloWorld.comp';

class HelloWorld extends HelloWorldComponent {
  render() {
    this.globalFunctions();

    return (
      <View style={this.styles.container}>
        <Text style={this.styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={this.styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={this.styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

export default HelloWorld;
