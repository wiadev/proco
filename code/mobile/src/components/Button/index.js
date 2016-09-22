import React from 'react';
import {
  TouchableOpacity
} from 'react-native';

import Text from '../Text';
import styles from './styles';

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity style={[this._getButtonStyle(), this.props.style]} onPress={() => this.props.onPress()} activeOpacity={0.8}>
        <Text style={[this._getButtonTextStyle(), this.props.textStyle]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
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
  type: 'default'
};
