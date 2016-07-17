import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PixelRatio,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { loadPage } from './intro.reducer';
import store from './../../store/configureStore';
import API from '../../api';
import { getCorrectFontSizeForScreen } from './../../core/functions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  linearGradient: {
    opacity: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignSelf: 'stretch',
    height,
  },
  swiper: {
    height: 231,
  },
  swiperText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  swiperIcon: {
    marginBottom: 28,
    height: 107,
  },
  swiperDot: {
    backgroundColor: 'transparent',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
  },
  swiperActiveDot: {
    backgroundColor: 'transparent',
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 7,
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
  },
  swiperActiveDotChild: {
    backgroundColor: '#fff',
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  swiperPagination: {
    bottom: 15,
  },
  footerText: {
    fontSize: 12,
    color: 'white',
    paddingBottom: 50,
    textAlign: 'center',
    backgroundColor: 'transparent',
    width: width * 0.7,
    fontFamily: 'Montserrat-Light',
    lineHeight: 15,
  },
  text: {
    fontFamily: 'Montserrat-Light',
    fontSize: 21,
    color: 'white',
  },
  logo: {
    marginBottom: 50,
    marginTop: 50,
  },
  fbLogin: {
    opacity: 0,
    backgroundColor: 'red',
    width: 340,
    height: 65,
  },
  fbLoginView: {
    backgroundColor: 'white',
    width: width * 80 / 100,
    height: 45,
    justifyContent: 'center',
    borderRadius: 50,
    paddingTop: 60,
  },
  fbLoginText: {
    color: '#3B5998',
    backgroundColor: 'transparent',
    fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 16),
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    top: -50,
    lineHeight: 30,
    left: 20,
  },
  fbLoginIcon: {
    backgroundColor: 'transparent',
    top: -17,
    left: getCorrectFontSizeForScreen(PixelRatio, width, height, 30),
  },
});

class IntroComp extends Component {

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  componentDidMount() {
    store.dispatch(loadPage());
  }


  startLogin () {
    API.Authentication.login()
      .then(() => {
        Actions.registerForm();
      })
      .catch(() => {
        alert("There was an error with your login.")
      });
  }

  render() {
    return (
      <View style={this.styles.container}>
        <LinearGradient colors={['#3B1CFF', '#F9365F']} style={this.styles.linearGradient}>
          <Image style={this.styles.logo} source={require('./../../images/logo.png')} />
          <Swiper
            style={this.styles.swiper}
            height={231}
            loop={false}
            dot={<View style={this.styles.swiperDot} />}
            activeDot={<View style={this.styles.swiperActiveDot}><View style={this.styles.swiperActiveDotChild} /></View>}
            paginationStyle={this.styles.swiperPagination}
          >
            <View style={this.styles.swiperText}>
              <Image style={this.styles.swiperIcon} source={require('./../../images/group.png')} />
              <Text style={this.styles.text}>Answer people's questions</Text>
            </View>
            <View style={this.styles.swiperText}>
              <Image style={this.styles.swiperIcon} source={require('./../../images/group.png')} />
              <Text style={this.styles.text}>Second Text</Text>
            </View>
            <View style={this.styles.swiperText}>
              <Image style={this.styles.swiperIcon} source={require('./../../images/group.png')} />
              <Text style={this.styles.text}>And third Text</Text>
            </View>
          </Swiper>

          <View style={this.styles.fbLoginView}>
            <Icon
              name="facebook-official"
              size={26}
              color="#3B5998"
              style={this.styles.fbLoginIcon}
            />
            <Text style={this.styles.fbLoginText} onPress={this.startLogin}>
              Login with Facebook
            </Text>
          </View>
          <Text style={this.styles.footerText}>
            By continuing you agree to our terms and privacy policy
          </Text>
        </LinearGradient>
      </View>
    );
  }
}

export default IntroComp;
