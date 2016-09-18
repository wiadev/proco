import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import colors from '../../core/style/colors';

export default class BlockerActivity extends React.Component {
  render() {
    return (
      <View style={styles.blockerActivity}>
        <ActivityIndicator size="large" color={colors.primaryAlt} />
      </View>
    )
  }
}
