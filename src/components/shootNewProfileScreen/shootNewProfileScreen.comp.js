import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import { loadPage, defaultState, photoSelected, photoTaken } from './shootNewProfileScreen.reducer';
import store from './../../store/configureStore';
import { connect } from 'react-redux';
import Header from './../header/header';
import MessageCountIcon from './../messageCountIcon/messageCountIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  preview: {
    position: 'relative',
    height,
    width,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    height: 75,
    width,
    backgroundColor: 'transparent',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomMenuLeft: {
    flex: 1,
    width: width * 25 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  bottomMenuRight: {
    flex: 1,
    width: width * 25 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  bottomMenuRightBtn: {
    height: 46,
    width: 46,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 23,
    backgroundColor: 'rgb(249, 54, 95)',
    overflow: 'hidden',
  },
  bottomMenuMid: {
    flex: 2,
    width: width * 50 / 100,
    position: 'relative',
    alignItems: 'center',
  },
});

class shootNewProfileScreenComp extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  componentDidMount() {
    store.dispatch(loadPage());
  }

  onPressBottomLeft() {
    Actions.pop();
  }

  onPressTakePhoto() {
    this.camera.capture()
      .then((data) => {
        store.dispatch(photoTaken(data.path));
        Actions.pop();
      })
      .catch(err => console.error(err));
  }

  onPressImagePicker() {
    ImagePicker.launchImageLibrary({
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };

        if (Platform.OS === 'ios') {
          source = { uri: response.uri.replace('file://', ''), isStatic: true };
        } else {
          source = { uri: response.uri, isStatic: true };
        }

        store.dispatch(photoSelected(source));
        Actions.pop();
      }
    });
  }

  render() {
    const states = store.getState().mainScreenReducer;

    let rightContainerHeader = null;
    if (states.get('messageCount') > 0) {
      rightContainerHeader = (
        <MessageCountIcon messageCount={states.get('messageCount')} />
      );
    }

    return (
      <View style={this.styles.preview}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={this.styles.preview}
          aspect={Camera.constants.Aspect.fill}
          type="front"
        >
          <Header
            rightContainer={rightContainerHeader}
            hideLeft={true}
            hideMid={true}
          />
          <View style={this.styles.bottomMenu}>
            <View style={this.styles.bottomMenuLeft} onPress={::this.onPressBottomLeft}>
              <Ionicons
                name="ios-radio-button-on"
                size={44}
                color="rgb(249, 54, 95)"
                style={{
                  position: 'absolute',
                  left: 29,
                  right: 0,
                  width: 42,
                  alignSelf: 'center',
                }}
              />
              <Ionicons
                name="ios-close-circle"
                size={46}
                color="white"
              />
            </View>
            <View style={this.styles.bottomMenuMid}>
              <Ionicons
                name="ios-radio-button-on"
                size={66}
                color="white"
                onPress={::this.onPressTakePhoto}
              />
            </View>
            <View style={this.styles.bottomMenuRight} />
          </View>
        </Camera>
      </View>
    );
  }
}

export default connect(() => defaultState.toJS())(shootNewProfileScreenComp);
