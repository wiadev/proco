import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Container from '../../../components/Container';
import Icon from "react-native-vector-icons/FontAwesome";
import Swiper from "react-native-swiper";

import Text from '../../../components/Text';
import { login } from "../../../modules/Authentication/actions";

import colors from '../../../core/style/colors';
import styles from './styles';

@connect(state => ({auth: state.auth}))
export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      swiperHeight: 0
    };
  }

  render() {
    return (
      <Container>
        <View style={styles.login}>
          <View style={styles.logoRow}>
            <View style={styles.logoSideCushion} />

            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />

            <View style={styles.logoSideCushion} />
          </View>

          <View style={styles.swiperRow} onLayout={event => this.setState({swiperHeight: event.nativeEvent.layout.height})}>
            {this._renderSwiper()}
          </View>

          <View style={styles.loginButtonRow}>
            {this._renderLoginButton()}
          </View>

          <Text style={styles.privacyPolicyNotice}>By continuing you agree to our terms and privacy policy.</Text>
        </View>
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
          activeDot={<View style={styles.swiperPaginationActiveDot}><View style={styles.swiperPaginationActiveDotInner}/></View>}
          paginationStyle={styles.swiperPagination}
        >
          <View style={styles.swiperSlide}>
            <View style={styles.swiperSlideImageContainer}>
              <View style={styles.swiperSlideImageSideCushion} />

              <Image source={require('../../../assets/images/login/swiper-image.png')} style={styles.swiperSlideImage} />

              <View style={styles.swiperSlideImageSideCushion} />
            </View>

            <Text style={styles.swiperSlideText}>Answer people's questions</Text>
          </View>

          <View style={styles.swiperSlide}>
            <View style={styles.swiperSlideImageSideCushion} />

            <Image source={require('../../../assets/images/login/swiper-image.png')} style={styles.swiperSlideImage} />

            <View style={styles.swiperSlideImageSideCushion} />

            <Text style={styles.swiperSlideText}>Answer people's questions</Text>
          </View>

          <View style={styles.swiperSlide}>
            <View style={styles.swiperSlideImageSideCushion} />

            <Image source={require('../../../assets/images/login/swiper-image.png')} style={styles.swiperSlideImage} />

            <View style={styles.swiperSlideImageSideCushion} />

            <View>
              <Text style={styles.swiperSlideText}>Answer people's questions</Text>
            </View>
          </View>
        </Swiper>
      );
    }
  }

  _renderLoginButton() {
    if (this.props.auth.inInProgress) {
      return (
        <ActivityIndicator size="large" color={colors.primaryAlt} />
      );
    }

    return (
      <TouchableOpacity onPress={() => this.props.dispatch(login())} style={styles.loginButton} activeOpacity={0.5}>
        <View style={styles.loginButtonContent}>
          <Icon name="facebook-official" style={styles.loginButtonIcon} />

          <Text style={styles.loginButtonText}>Login with Facebook</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
