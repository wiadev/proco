import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Swiper from "react-native-swiper";

import {login} from "../../../modules/Authentication/actions";

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
      <View style={styles.login}>
        <View style={styles.logoRow}>
          <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
        </View>

        <View style={styles.swiperRow} onLayout={event => this.setState({swiperHeight: event.nativeEvent.layout.height})}>
          {this._renderSwiper()}
        </View>

        <View style={styles.loginButtonRow}>
          <TouchableOpacity onPress={() => this.props.dispatch(login())} activeOpacity={0.5}>
            <View style={styles.loginButton}>
              <Icon name="facebook-official" style={styles.loginButtonIcon} />

              <Text style={styles.loginButtonText}>Login with Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.privacyPolicyNotice}>By continuing you agree to our terms and privacy policy</Text>
      </View>
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
            <Image source={require('../../../assets/images/group.png')} style={styles.swiperSlideImage}/>

            <Text style={styles.swiperSlideText}>Answer people's questions</Text>
          </View>

          <View style={styles.swiperSlide}>
            <Image source={require('../../../assets/images/group.png')} style={styles.swiperSlideImage}/>

            <Text style={styles.swiperSlideText}>Answer people's questions</Text>
          </View>

          <View style={styles.swiperSlide}>
            <Image source={require('../../../assets/images/group.png')} style={styles.swiperSlideImage}/>

            <Text style={styles.swiperSlideText}>Answer people's questions</Text>
          </View>
        </Swiper>
      );
    }
  }
}
