import React, { Component } from 'react';
import { connect } from 'react-redux';

import { WebView, Dimensions, Text, TouchableHighlight, View } from 'react-native';

const height = Dimensions.get('window').height - 65;

@connect(
  state => ({
    auth: state.auth,
  }),
)
class WebViewModal extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let uri = this.props.url;
    const firebase_token = this.props.auth.firebase_token;
    if (firebase_token) {
      uri = `${uri}#firebase_token=${firebase_token}`;
    }
    return (
          <View style={{flex: 1, paddingTop: 65}}>
               <WebView
                source={{uri}}
                style={{height}}
              />
          </View>
    );
  }
}

export default WebViewModal;
