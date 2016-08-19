import React, { Component } from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { login } from '../../../modules/Authentication/actions';
import { setStatusBarStyle } from '../../../modules/StatusBar/actions';
import { connect } from 'react-redux';
import { PRIVACY_PAGE, TERMS_PAGE } from '../../../core/StaticPages';

import styles from './styles';

@connect(
  state => ({
    auth: state.auth,
    user: state.user,
  }),
)
class Login extends Component {

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  componentWillMount() {
    this.checkAuthAndRedirect();
    this.props.dispatch(setStatusBarStyle('light-content'));
  }

  componentWillReceiveProps(props) {
    this.checkAuthAndRedirect(props);
  }

  checkAuthAndRedirect(props = this.props) {
    if(props.user.isLoaded) {
      Actions.RegisterForm();
    }
  }

  renderLoginButton() {
    return (
      <View>
        <View style={this.styles.fbLoginView}>
          <Icon
            name="facebook-official"
            size={26}
            color="#3B5998"
            style={this.styles.fbLoginIcon}
          />
          <Text style={this.styles.fbLoginText} onPress={() => this.props.dispatch(login())}>
            Login with Facebook
          </Text>
        </View>
        <TouchableHighlight onPress={() => Alert.alert(
          'Which one do you want to see?',
          null,
          [
            {text: 'Terms of Use', onPress: () =>  Actions.WebViewModal(TERMS_PAGE)},
            {text: 'Privacy Policy', onPress: () => Actions.WebViewModal(PRIVACY_PAGE)},
            {text: 'Cancel', onPress: () => {}},
          ]
        )}>
          <Text style={this.styles.footerText}>
            By continuing you agree to our terms and privacy policy
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderAuthLoading() {
    return (<ActivityIndicator
      style={[styles.centering, {paddingBottom: 75}]}
      size="large"
      color="#ffffff"
    />);
  }
  render() {
    return (
      <View style={this.styles.container}>
          <Image style={this.styles.logo} resizeMode="contain" source={require('../../../assets/images/logo.png')} />
          <Swiper
            style={this.styles.swiper}
            height={231}
            loop={false}
            dot={<View style={this.styles.swiperDot} />}
            activeDot={<View style={this.styles.swiperActiveDot}><View style={this.styles.swiperActiveDotChild} /></View>}
            paginationStyle={this.styles.swiperPagination}
          >
            <View style={this.styles.swiperText}>
              <Image style={this.styles.swiperIcon} source={require('../../../assets/images/group.png')} />
              <Text style={this.styles.text}>Answer people's questions</Text>
            </View>
            <View style={this.styles.swiperText}>
              <Image style={this.styles.swiperIcon} source={require('../../../assets/images/group.png')} />
              <Text style={this.styles.text}>Second Text</Text>
            </View>
            <View style={this.styles.swiperText}>
              <Image style={this.styles.swiperIcon} source={require('../../../assets/images/group.png')} />
              <Text style={this.styles.text}>And third Text</Text>
            </View>
          </Swiper>

          {
            (!this.props.auth.isInProgress && !this.props.auth.uid) ? ::this.renderLoginButton() : ::this.renderAuthLoading()
          }

      </View>
    );
  }
}

export default Login;
