import React, { Component } from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import styles from './styles';

class Loading extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} resizeMode="contain" source={require('../../assets/images/logo.png')} />
        <ActivityIndicator
          style={[styles.centering, {paddingBottom: 75}]}
          size="large"
          color="#ffffff"
        />

      </View>
    );
  }
}

export default Loading;
