import React from 'react';
import {
  ActivityIndicator,
  View,
  Image
} from 'react-native';

import styles from './styles';

export default class Loading extends React.Component {

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
