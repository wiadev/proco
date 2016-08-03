import React, { Component } from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  Image,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { defaultState } from '../../modules/Authentication/reducer';
import { connect } from 'react-redux';
import styles from './styles';

@connect(
  state => ({ auth: state.auth }),
)
class Login extends Component {

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  startLogin () {
    const self = this;
   /* API.Authentication.facebookLogin()
      .catch((error) => {
        Alert.alert(
          'Login Problem',
          error,
          [
            {text: 'Try again', onPress: () => self.startLogin},
            {text: 'Cancel', onPress: () => Actions.registerForm, style: 'cancel'}, //@TODO: Only for debug purposes, remove before public beta
          ]
        );
      });*/
  }

  componentWillReceiveProps(props) {
    if(props.auth.get('isLoggedIn')) {
      Actions.registerForm();
    }
  }

  renderLoginButton() {
    return (<View>
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
    </View>);
  }

  renderAuthLoading() {
    return (<ActivityIndicator
      style={[styles.centering, {transform: [{scale: 1.5}]}]}
      size="large"
    />);
  }
  render() {

    console.log(this.props.auth.toJS())
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

          {
            (this.props.auth.get('isLoaded') && !this.props.auth.get('isLoggedIn')) ? ::this.renderLoginButton() : ::this.renderAuthLoading()
          }

        </LinearGradient>
      </View>
    );
  }
}

export default Login;