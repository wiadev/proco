import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

export default class CustomText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[styles.customText, this.props.style]}>{this.props.children}</Text>
    );
  }
}

CustomText.propTypes = {
  style: React.PropTypes.any
};
