import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native';

import styles from './styles';
import colors from '../../../core/style/colors';

export default class SMSVerification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      hasError: false,
      code: ""
    };
  }

  render() {
    return (
      <View style={styles.SMSVerification}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text style={[styles.text, styles.title]}>One last step!</Text>

          <Text style={[styles.text, styles.description]}>We've just sent you a 6-digit verification code to verify your phone number.</Text>

          {this._renderContentOrLoading()}
        </KeyboardAvoidingView>
      </View>
    )
  }

  _renderContentOrLoading() {
    if (this.state.loading) {
      return (
        <ActivityIndicator size="large" color={colors.primaryAlt} style={styles.activityIndicator} />
      );
    } else {
      return (
        <View>
          {this._renderError()}

          <TextInput
            value={this.state.code}
            onChangeText={code => this._setCode(code)}
            autoFocus={true}
            autoCorrect={false}
            returnKeyType="done"
            placeholder="XXXXXX"
            placeholderTextColor={colors.dimPrimaryAlt}
            style={styles.input}
          />
        </View>
      );
    }
  }

  _renderError() {
    if (this.state.hasError) {
      return (
        <Text style={[styles.text, styles.error]}>Ooops! Code you've entered appears to be wrong.</Text>
      );
    }
  }

  _setCode(code) {
    this.setState({
      hasError: false,
      code: code
    });

    if (code.length === 6) {
      this._done();
    }
  }

  _done() {
    // This method is triggered when code entered is 6-chars long.
    this.setState({
      loading: true
    });

    // TODO: Add code verification logic here.
    // If code is wrong and somehow needs to re-entered, do this:
    this.setState({
      loading: false,
      hasError: true,
      code: ""
    });

    // Otherwise, pop some Actions, route to another scene or something.
    // Actions.pop();
  }
}
