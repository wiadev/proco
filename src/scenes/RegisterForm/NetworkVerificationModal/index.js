import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import { BlurView } from 'react-native-blur';
import {
  MKTextField,
} from 'react-native-material-kit';
import { styles } from './styles';

class NetworkVerificationModal extends Component {

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
            <Image resizeMode={'contain'} source={require('../../../assets/images/grofersBeeVisuals.png')} style={this.styles.image} />
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
            <View style={this.styles.buttonList}>
              <View
                style={this.styles.backBtn}
                pointerEvents={'box-none'}
              >
                <Text
                  style={[this.styles.verifyButtonTxt, {
                    color: '#fa3f6a',
                  }]}
                  onPress={this.props.onVerifyClick}
                >Back</Text>
              </View>
              <View
                style={this.styles.resendBtn}
                pointerEvents={'box-none'}
              >
                <Text
                  style={[this.styles.verifyButtonTxt, {
                    color: '#ffffff',
                  }]}
                  onPress={this.props.onVerifyClick}
                >Re-send</Text>
              </View>
            </View>
            <Text style={this.styles.error}>*Wrong Code, please try again in a minute</Text>
          </View>
        </BlurView>
      </View>
    );
  }
}

export default NetworkVerificationModal;
