import React from "react";
import { connect } from "react-redux";
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import reactMixin from 'react-mixin';
import reactTimerMixin from 'react-timer-mixin';
import { Actions } from "react-native-router-flux";
import Swiper from "react-native-swiper";
import Modal from '../../components/Modal';

import Container from "../../components/Container";
import { getFacebookAccessToken } from "../../core/auth/api";
import colors from "../../core/style/colors";
import styles from "./styles";
import Text from '../../components/Text';
import NetworkVerification from './NetworkVerification';
import MissingInformation from './MissingInformation';

@connect(state => ({
  isAuthenticated: state.auth.get('authenticated'),
  isAuthLoaded: state.auth.get('loaded'),
  isUserInitialized: state.user.get('initialized'),
  isUserOnboarded: state.user.info.get('onboarded'),
  userOnboarding: state.userOnboarding,
}))
@reactMixin.decorate(reactTimerMixin)
export default class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      swiperHeight: 0,
      isInProgress: false,
      isCancelled: false,
    };
  }

  startFacebookLogin() {
    this.setState({
      isInProgress: true,
      isCancelled: false,
    });

    getFacebookAccessToken(this.props.dispatch)
      .then(() => this.setState({
        isInProgress: false,
      }))
      .catch(() => {
        const _alert = this.setTimeout(() => {
          Alert.alert(
            'Login was cancelled',
            'You\'ll need to authorize Facebook to enjoy Proco. Keep in mind Proco doesn\'t publish anything on your profile.',
            [
              {text: 'OK', onPress: () => {}, style: 'cancel'},
              {text: 'Contact Proco', onPress: () => Actions.CONTACT},
            ]
          );

          this.setState({
            isInProgress: false,
            isCancelled: true,
          });

          this.clearTimeout(_alert);
        }, 500);
      });
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="blue" barStyle="light-content" />

        <View style={styles.login}>
          <View style={styles.logoRow}>
            <View style={styles.logoSideCushion}/>

            <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>

            <View style={styles.logoSideCushion}/>
          </View>

          <View style={styles.swiperRow} onLayout={event => this.setState({swiperHeight: event.nativeEvent.layout.height})}>
            {this._renderSwiper()}
          </View>

          <View style={styles.loginButtonRow}>
            {this._renderLoginButton()}
          </View>

          <Text style={styles.privacyPolicyNotice}>
            <Text>By continuing you agree to our </Text>
            <Text style={styles.privacyPolicyNoticeLink} onPress={Actions.TERMS_OF_USAGE}>terms</Text>
            <Text> and </Text>
            <Text style={styles.privacyPolicyNoticeLink} onPress={Actions.PRIVACY_POLICY}>privacy policy</Text>.
          </Text>
        </View>
        {this._renderRegister()}
      </Container>
    );
  }

  _renderSwiper() {
    // Each child of Swiper element is rendered as a separate slide.
    if (this.state.swiperHeight !== 0) {
      return (
        <Swiper
          height={this.state.swiperHeight}
          loop={false}
          dot={<View style={styles.swiperPaginationDot}/>}
          activeDot={<View style={styles.swiperPaginationActiveDot}><View
            style={styles.swiperPaginationActiveDotInner}/></View>}
          paginationStyle={styles.swiperPagination}
        >
          <View style={styles.swiperSlide}>
            <View style={styles.swiperSlideImageContainer}>
              <View style={styles.swiperSlideImageSideCushion}/>

              <Image source={require('../../assets/images/login/swiper-image.png')} style={styles.swiperSlideImage}/>

              <View style={styles.swiperSlideImageSideCushion}/>
            </View>

            <Text style={styles.swiperSlideText}>Answer people's questions</Text>
          </View>

          <View style={styles.swiperSlide}>
            <View style={styles.swiperSlideImageSideCushion}/>

            <Image source={require('../../assets/images/login/swiper-image.png')} style={styles.swiperSlideImage}/>

            <View style={styles.swiperSlideImageSideCushion}/>

            <Text style={styles.swiperSlideText}>Answer people's questions</Text>
          </View>

          <View style={styles.swiperSlide}>
            <View style={styles.swiperSlideImageSideCushion}/>

            <Image source={require('../../assets/images/login/swiper-image.png')} style={styles.swiperSlideImage}/>

            <View style={styles.swiperSlideImageSideCushion}/>

            <View>
              <Text style={styles.swiperSlideText}>Answer people's questions</Text>
            </View>
          </View>
        </Swiper>
      );
    }
  }

  _renderLoginButton() {
    if (this.props.isAuthLoaded && !this.state.isInProgress && !this.props.isAuthenticated) {
      return (
        <TouchableOpacity onPress={() => this.startFacebookLogin()} style={styles.loginButton} activeOpacity={0.5}>
          <View style={styles.loginButtonContent}>
            <Icon name="facebook-official" style={styles.loginButtonIcon}/>

            <Text style={styles.loginButtonText}>Login with Facebook</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <ActivityIndicator size="large" color={colors.primaryAlt}/>
    );

  }

  _renderRegister() {
    if (!this.props.isUserInitialized || this.props.isUserOnboarded) return null;

    let show = this.props.userOnboarding.get('show');
    if (show === 'loading') return null;

    let step = this.props.userOnboarding.get('step');

    let modalToShow = (show === 'network_verification') ? <NetworkVerification /> : <MissingInformation />;

    return (
      <Modal ref="modal" isOpen={true} backdropPressToClose={false} height={0.8}>
        { modalToShow }
      </Modal>
    );
  }
}
