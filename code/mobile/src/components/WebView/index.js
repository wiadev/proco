import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  View,
  WebView
} from 'react-native';

import Header from '../Header';
import styles from './styles';

export default class CustomWebView extends React.Component {
  render() {
    return (
      <View style={styles.customWebView}>
        <Header
          theme="light"
          rightActorType="text"
          rightActor="Done"
          rightAction={Actions.pop}
          title={this.props.title}
        />

        <WebView
          source={{uri: this.props.uri}}
          style={styles.webView}
        />
      </View>
    );
  }
}

CustomWebView.propTypes = {
  title: React.PropTypes.string.isRequired,
  uri: React.PropTypes.string.isRequired
};
