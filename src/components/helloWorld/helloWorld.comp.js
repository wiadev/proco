import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

class HelloWorldComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = styles;
  }

  globalFunctions() {
    console.log('global functions are here.');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default HelloWorldComponent;
