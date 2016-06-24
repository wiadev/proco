import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { loadPage } from './mainScreen.reducer';
import store from './../../store/configureStore';
import Camera from 'react-native-camera';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defScreen: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height,
    width,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});

class TitleText extends React.Component {
  render() {
    return (
      <Text style={{ fontSize: 48, color: 'white' }}>
        {this.props.label}
      </Text>
    );
  }
}

class mainScreenComp extends Component {
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

  render() {
    return (
      <View style={this.styles.container}>
        <Swiper
          loop={false}
          showsPagination={false}
          index={1}
        >
          <View style={this.styles.defScreen}>
            <TitleText label="Left" />
          </View>
          <Swiper
            horizontal={false}
            loop={false}
            showsPagination={false}
            index={1}
          >
            <View style={this.styles.defScreen}>
              <TitleText label="Top" />
            </View>
            <View style={this.styles.defScreen}>
              <Camera
                ref={(cam) => {
                  this.camera = cam;
                }}
                style={this.styles.preview}
                aspect={Camera.constants.Aspect.fill}
              >
                <Text style={this.styles.capture}>[CAPTURE]</Text>
              </Camera>
            </View>
            <View style={this.styles.defScreen}>
              <TitleText label="Bottom" />
            </View>
          </Swiper>
          <View style={this.styles.defScreen}>
            <TitleText label="Right" />
          </View>
        </Swiper>
      </View>
    );
  }
}

export default mainScreenComp;
