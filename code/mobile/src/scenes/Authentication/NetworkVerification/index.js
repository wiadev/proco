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
import styles from './styles';
import { Actions } from 'react-native-router-flux';

class NetworkVerification extends Component {

  static propTypes = {
    onVerifyClick: React.PropTypes.any,
  };

  static defaultProps = {
    onVerifyClick: null,
  };

  constructor(props) {
    super(props);
  }

  state = {
    email: null,
  };

  render() {
    return (
          <View style={styles.popupInside}>
            <View style={styles.passwordArea}>
              <MKTextField
                autoCapitalize={'characters'}
                autoCorrect={false}
                keyboardType={'numeric'}
                tintColor={'transparent'}
                textInputStyle={styles.passwordTxt}
                placeholder="XXXXXX"
                style={styles.password}
                underlineEnabled={false}
                placeholderTextColor={'rgb(180, 180, 190)'}
                onTextChange={(email) => { setState({ email }); }}
                maxHeight={6}
              />
            </View>
            <View
              style={styles.verifyButton}
              pointerEvents={'box-none'}
            >
              <Text
                style={styles.verifyButtonTxt}
                onPress={this.props.onVerifyClick}
              >Verify School E-mail</Text>
            </View>
            <View style={styles.buttonList}>
              <View
                style={styles.backBtn}
                pointerEvents={'box-none'}
              >
                <Text
                  style={[styles.verifyButtonTxt, {
                    color: '#fa3f6a',
                  }]}
                  onPress={() => {
                    Actions.pop();
                  }}
                >Back</Text>
              </View>
              <View
                style={styles.resendBtn}
                pointerEvents={'box-none'}
              >
                <Text
                  style={[styles.verifyButtonTxt, {
                    color: '#ffffff',
                  }]}
                  onPress={this.props.onVerifyClick}
                >Re-send</Text>
              </View>
            </View>
            <Text style={styles.error}>*Wrong Code, please try again in a minute</Text>
          </View>
    );
  }
}

export default NetworkVerification;
