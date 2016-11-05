import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  ActivityIndicator
} from 'react-native';

import Text from '../../../components/Text';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import styles from './styles';
import colors from '../../../core/style/colors';

import { userOnboardingPostNetworkEmail } from '../../../modules/user/onboarding';

@connect(
  state => ({
    user: state.user,
    step: state.userOnboarding.get('step'),
    in_progress: state.userOnboarding.get('in_progress'),
    error: state.userOnboarding.get('error'),
  }),
  dispatch => ({
    submit: (network_email) => dispatch(userOnboardingPostNetworkEmail(network_email)),
  })
)
export default class NetworkVerification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecking: true,
      networkEmail: "",
    };
  }

  render() {
    let subScene = null;

    switch (this.props.step) {
      case 'form':
        subScene = this._renderForm();
        break;
      case 'error':
        subScene = this._renderErrors();
        break;
      case 'result':
        subScene = this._renderLoading();
        break;
    }

    return (
      <View style={styles.container}>
        {subScene}
      </View>
    );

    // return (
    //   <View style={styles.container} onLayout={e => this.setState({
    //     swiperWidth: e.nativeEvent.layout.width,
    //     swiperHeight: e.nativeEvent.layout.height
    //   })}>
    //     <Swiper
    //       ref={swiper => this.swiper = swiper}
    //       scrollEnabled={false}
    //       loop={false}
    //       showsPagination={false}
    //       width={this.state.swiperWidth}
    //       height={this.state.swiperHeight}>
    //       {this._renderForm()}
    //
    //       {this._renderErrors()}
    //
    //       {this._renderLoading()}
    //     </Swiper>
    //
    //     {this._listenToStore()}
    //   </View>
    // );
  }

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
            onChangeText={networkEmail => this.setState({networkEmail: networkEmail})}
            style={styles.formInput}
          />
        </View>

        <Button type="text" text="Continue" onPress={::this._onFormSubmit} highlight={true} style={styles.button} textStyle={styles.buttonTextStyle} />
      </View>
    );
  }

  _onFormSubmit() {
    this.props.submit(this.state.networkEmail);
  }

  _renderErrors() {
    let errorMessage = "";

    switch (this.props.error) {
      case 'INVALID_EMAIL':
        errorMessage = "The email you provided is not valid.";
        break;
      case 'COMMON_PROVIDER':
        errorMessage = "University email is required to continue.";
        break;
      case 'CHECK_EMAIL':
        errorMessage = "University email is required to continue.";
        break;
      case 'NETWORK_NOT_SUPPORTED':
        errorMessage = "Proco is not available in your university, yet.";
        break;
    }

    return (
      <View style={styles.slide}>
        <Image source={require('../../../assets/images/error.png')} style={styles.topImage} />

        <Text style={[styles.title, styles.errorTitle]}>{errorMessage}</Text>
      </View>
    );
  }

  _renderLoading() {
    return (
      <View style={styles.slide}>
        <ActivityIndicator size="large" color={colors.success} style={[styles.loadingIndicator, {transform: [{scale: 1.5}]}]} />

        <Text style={[styles.title, styles.loadingTitle]}>Please click the link in the email we sent you.</Text>
      </View>
    );
  }
}
