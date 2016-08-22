import React from 'react';
import {
  ActivityIndicator,
} from 'react-native';

import styles from './styles';

export default function BlockerActivity (props) {

  return (<ActivityIndicator
    style={styles.container}
    size="large"
    color="#ffffff"
  />);

}
