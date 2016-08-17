import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

class Test extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.preview}>
        <View style={styles.permissionArea} >
      <Text>TEst</Text>
          </View>
      </View>
    );
  }
}

export default Test;
