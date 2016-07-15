import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import { BlurView } from 'react-native-blur';
import {
  MKTextField,
} from 'react-native-material-kit';

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
    alignItems: 'center',
  },
  password: {
    borderWidth: 0,
    height: 80,
  },
  passwordArea: {
    backgroundColor: 'green',
    height: 80,
  },
  passwordTxt: {
    fontFamily: 'Montserrat-Light',
    color: 'rgb(5,5,6)',
    fontSize: 26,
    marginTop: 30,
    height: 80,
    backgroundColor: 'red',
  },
  headText: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgb(51,205,153)',
    fontSize: 20,
    marginTop: 10,
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
    fontSize: 18,
  },
});

class MailVerifyModalComp extends Component {

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  render() {
    return (
      <View style={this.styles.popup}>
        <BlurView blurType="light" style={this.styles.blurView}>
          <View style={this.styles.popupInside}>
            <Image source={require('./../../images/grofersBeeVisuals.png')} />
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
                tintColor={'red'}
                textInputStyle={this.styles.passwordTxt}
                placeholder="XXX XXX"
                value="XXX XXX"
                style={this.styles.password}
                underlineEnabled={true}
                placeholderTextColor={'rgb(5,5,6)'}
                onTextChange={(email) => { this.setState({ email }); }}
              />
            </View>
            <View style={this.styles.verifyButton}>
              <Text style={this.styles.verifyButtonTxt}>Verify School E-mail</Text>
            </View>
          </View>
        </BlurView>
      </View>
    );
  }
}

export default MailVerifyModalComp;
