import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  LoginButton,
} from 'react-native-fbsdk';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
  },
  welcome: {
    fontSize: 42,
    textAlign: 'center',
  },
  swiper: {
  },
  swiperText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#333333',
    paddingBottom: 50,
    textAlign: 'center',
    width: width * 0.6,
  },
});

class IntroComp extends Component {
  static propTypes = {
    styles: React.PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  onLoginFinished(error, result) {
    if (error) {
      alert('Login failed with error: ' + result.error);
    } else if (result.isCancelled) {
      alert('Login was cancelled');
    } else {
      alert('Login was successful with permissions: ' + result.grantedPermissions);
    }
  }

  render() {
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.welcome}>
          HelloApp!
        </Text>
        <Swiper style={this.styles.swiper} height={150} loop={false}>
          <View style={this.styles.swiperText}>
            <Text style={this.styles.text}>Answer people's questions</Text>
          </View>
          <View style={this.styles.swiperText}>
            <Text style={this.styles.text}>Second Text</Text>
          </View>
          <View style={this.styles.swiperText}>
            <Text style={this.styles.text}>And third Text</Text>
          </View>
        </Swiper>
        <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={::this.onLoginFinished}
          onLogoutFinished={() => alert('User logged out')} />
        <Text style={this.styles.footerText}>
          By continuing you agree to our terms and privacy policy
        </Text>
      </View>
    );
  }
}

export default IntroComp;
