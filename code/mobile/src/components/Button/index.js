import React from 'react';
import {
  View,
} from 'react-native';

import Text from '../Text';
import styles from './styles';

export default class Button extends React.Component {
  render() {
    return (
      <View style={[this._getButtonStyle(), this.props.style]} pointerEvents={'box-none'}>
        <Text style={[this._getButtonTextStyle(), this.props.textStyle]} onPress={() => this.props.onPress()}>
          {this.props.text}
        </Text>
      </View>
    );
  }

  _getButtonStyle() {
    let buttonStyle = [styles.button];

    switch (this.props.type) {
      case 'danger':
        buttonStyle.push(styles.buttonDanger);
        break;
      case 'warning':
        buttonStyle.push(styles.buttonWarning);
        break;
      case 'success':
        buttonStyle.push(styles.buttonSuccess);
        break;
      case 'info':
        buttonStyle.push(styles.buttonInfo);
        break;
    }

    return buttonStyle;
  }

  _getButtonTextStyle() {
    let buttonTextStyle = [styles.buttonText];

    if (['danger', 'warning', 'success', 'info'].indexOf(this.props.type) !== -1) {
      buttonTextStyle.push(styles.buttonTextWhite);
    }

    return buttonTextStyle;
  }
}

Button.propTypes = {
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
  type: React.PropTypes.string,
  style: React.PropTypes.any,
  textStyle: React.PropTypes.any
};

Button.defaultProps = {
  type: 'regular'
};
