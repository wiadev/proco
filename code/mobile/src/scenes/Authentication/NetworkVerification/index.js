import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import Swiper from "react-native-swiper";

import Text from '../../../components/Text';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import styles from './styles';
import colors from '../../../core/style/colors';

@connect(state => ({user: state.user}))
export default class NetworkVerification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecking: true,
      swiperWidth: 0,
      swiperHeight: 0
    };
  }

  render() {
    return (
      <View style={styles.container} onLayout={e => this.setState({
        swiperWidth: e.nativeEvent.layout.width,
        swiperHeight: e.nativeEvent.layout.height
      })}>
        <Swiper
          ref="swiper"
          loop={false}
          showsPagination={false}
          width={this.state.swiperWidth}
          height={this.state.swiperHeight}>
          {this._renderForm()}

          {this._renderErrors()}

          {this._renderLoading()}
        </Swiper>
      </View>
    );
  }

  // slide#1
  _renderForm() {
    return (
      <View style={styles.slide}>
        <Image source={require('../../../assets/images/verify.png')} style={styles.topImage} />

        <Text style={[styles.title, styles.formTitle]}>We'll need to verify your school e-mail.</Text>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>TYPE YOUR UNIVERSITY EMAIL</Text>

          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            keyboardType="email-address"
            placeholder='yourname@university.edu'
            placeholderTextColor={colors.gray3}
            onChangeText={network_email => this.setState({network_email})}
            style={styles.formInput}
          />
        </View>

        <Button type="text" text="Continue" onPress={::this._onFormSubmit} highlight={true} style={styles.button} textStyle={styles.buttonTextStyle} />
      </View>
    );
  }

  // slide#2
  _renderErrors() {
    return (
      <View style={styles.slide}>
        <Image source={require('../../../assets/images/error.png')} style={styles.topImage} />

        <Text style={[styles.title, styles.errorTitle]}>There are some errors :(</Text>
      </View>
    );
  }

  // slide#3
  _renderLoading() {
    return (
      <View style={styles.slide}>
        <ActivityIndicator size="large" color={colors.success} style={[styles.loadingIndicator, {transform: [{scale: 1.5}]}]} />

        <Text style={[styles.title, styles.loadingTitle]}>Please click the link in the e-mail we sent you.</Text>
      </View>
    );
  }

  _onFormSubmit() {
    this.refs.swiper.scrollBy(1);
  }
}
