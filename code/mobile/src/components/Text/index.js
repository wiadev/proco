import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

export default class CustomText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[this._getTextStyle(), this.props.style]}>{this.props.children}</Text>
    );
  }

  _getTextStyle() {
    let textStyle = [styles.customText];

    if (this.props.chatText) {
      textStyle.push(styles.chatText);
    }

    return textStyle;
  }
}

CustomText.propTypes = {
  chatText: React.PropTypes.bool,
  style: React.PropTypes.any
};

CustomText.defaultProps = {
  chatText: false
};
