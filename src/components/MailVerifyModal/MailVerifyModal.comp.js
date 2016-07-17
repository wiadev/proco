import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  PixelRatio,
} from 'react-native';
import { BlurView } from 'react-native-blur';
import {
  MKTextField,
} from 'react-native-material-kit';
import { getCorrectFontSizeForScreen } from './../../core/functions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const popupWidth = width * 80 / 100;
const popupHeight = height * 80 / 100;

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    width,
    height,
    top: 0,
    left: 0,
  },
  blurView: {
    position: 'relative',
    flex: 1,
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupInside: {
    backgroundColor: 'white',
    flex: 0,
    width: popupWidth,
    height: popupHeight,
    borderRadius: 11,
    padding: 10,
    paddingTop: 5,
    alignItems: 'center',
  },
  password: {
    borderWidth: 0,
    width: 150,
  },
  passwordArea: {},
  passwordTxt: {
    fontFamily: 'Montserrat-Light',
    color: 'rgb(5,5,6)',
    fontSize: 26,
    marginTop: 15,
    height: 50,
    marginBottom: 15,
    textAlign: 'center',
  },
  headText: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgb(51,205,153)',
    fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 18),
    marginTop: 5,
    alignSelf: 'center',
    textAlign: 'center',
  },
  descriptionText: {
    fontFamily: 'Montserrat-Light',
    color: 'rgb(82,93,103)',
    fontSize: 14,
    marginTop: 15,
    alignSelf: 'center',
    textAlign: 'center',
  },
  verifyButton: {
    borderRadius: 50,
    backgroundColor: 'rgb(51,205,153)',
    width: popupWidth * 80 / 100,
    height: 50,
    justifyContent: 'center',
    padding: 10,
  },
  verifyButtonTxt: {
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    textAlign: 'center',
    fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 16),
  },
  error: {
    fontFamily: 'Montserrat-Regular',
    color: 'red',
    textAlign: 'center',
    fontSize: 12,
    opacity: 0,
  },
  image: {
    height: height * 0.3,
  },
});

class MailVerifyModalComp extends Component {

  static propTypes = {
    onVerifyClick: React.PropTypes.any,
  };

  static defaultProps = {
    onVerifyClick: null,
  };

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  state = {
    email: null,
  };

  render() {
    return (
      <View style={this.styles.popup}>
        <BlurView blurType="light" style={this.styles.blurView}>
          <View style={this.styles.popupInside}>
            <Image resizeMode={'contain'} source={require('./../../images/grofersBeeVisuals.png')} style={this.styles.image} />
            <Text style={this.styles.headText}>We'll need to verify your school e-mail.</Text>
            <Text style={this.styles.descriptionText}>
              You can easily do that by either entering the code we’ve just
              sent you by clicking the link in the e-mail you’ve recieved.
            </Text>
            <View style={this.styles.passwordArea}>
              <MKTextField
                autoCapitalize={'characters'}
                autoCorrect={false}
                keyboardType={'numeric'}
                tintColor={'transparent'}
                textInputStyle={this.styles.passwordTxt}
                placeholder="XXXXXX"
                style={this.styles.password}
                underlineEnabled={false}
                placeholderTextColor={'rgb(180, 180, 190)'}
                onTextChange={(email) => { this.setState({ email }); }}
                maxHeight={6}
              />
            </View>
            <View
              style={this.styles.verifyButton}
              pointerEvents={'box-none'}
            >
              <Text
                style={this.styles.verifyButtonTxt}
                onPress={this.props.onVerifyClick}
              >Verify School E-mail</Text>
            </View>
            <Text style={this.styles.error}>*Wrong Code, please try again in a minute</Text>
          </View>
        </BlurView>
      </View>
    );
  }
}

export default MailVerifyModalComp;
