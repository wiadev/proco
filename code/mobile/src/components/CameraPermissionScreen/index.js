import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

class CameraPermissionScreen extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  render() {
    return (
      <View style={this.styles.preview}>
        <Image
          style={this.styles.backgroundImage}
          source={require('../../assets/images/stock-photo-56093412-selfi-man-with-his-dog-.jpg')}
        />
        <LinearGradient
          colors={['rgba(59, 28, 255, 0.8)', 'rgba(249, 54, 95, 0.8)']}
          style={this.styles.preview}
        >
          <View style={this.styles.permissionArea}>
            <Image style={this.styles.permissionImage} source={require('../../assets/images/cameraPermission.png')} />
            <Text style={this.styles.permissionLabel}>
              Camera permission is required
            </Text>
            <Text style={this.styles.permissionText}>
              To give camera access, you can...
            </Text>
            <View style={this.styles.button} pointerEvents={'box-none'}>
              <Text style={this.styles.buttonText} onPress={Actions.moreSettingsScreen}>
                Go to Settings
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default CameraPermissionScreen;
