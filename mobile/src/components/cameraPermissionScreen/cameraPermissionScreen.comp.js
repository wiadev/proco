import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  preview: {
    position: 'relative',
    height,
    width,
  },
  backgroundImage: {
    position: 'absolute',
    height,
    width,
  },
  permissionArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionImage: {
    marginBottom: 25,
  },
  permissionLabel: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 28,
    textAlign: 'center',
  },
  permissionText: {
    marginTop: 10,
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 20,
    width: 230,
    marginTop: 40,
  },
  buttonText: {
    color: 'rgb(249,54,95)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});

class cameraPermissionScreenComp extends Component {
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

export default cameraPermissionScreenComp;
