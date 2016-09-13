import React, { Component } from 'react';
import {
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

import Text from '../../../../components/Text';
import styles from './styles';
const icon = '../../../../assets/images/cameraPermission.png';
import Permissions from 'react-native-permissions';
class GodMode extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.preview}>
        <View style={styles.permissionArea} >
          <Text>Test</Text>
        </View>
      </View>
    );
  }
}

export default GodMode;
