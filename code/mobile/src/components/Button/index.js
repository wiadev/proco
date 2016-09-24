import React from 'react';
import {
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Text from '../Text';
import styles from './styles';

const types = ['text', 'icon'];

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity style={[this._getButtonStyle(), this.props.style]} onPress={() => this.props.onPress()} activeOpacity={0.8}>
        {this._renderContent()}
      </TouchableOpacity>
    );
  }

  _renderContent() {
    if (this.props.type === 'icon') {
      return (
        <Icon name={this.props.icon} style={[this._getContentStyle(), styles.icon]} />
      );
    } else {
      return (
        <Text style={[this._getContentStyle(), styles.text, this.props.textStyle]}>
          {this.props.text}
        </Text>
      );
    }
  }

  _getButtonStyle() {
    let buttonStyle = [styles.button];

    switch (this.props.type) {
      case 'text':
        buttonStyle.push(styles.textButton);
        break;
      case 'icon':
        buttonStyle.push(styles.iconButton);
        break;
    }

    if (this.props.highlight) {
      buttonStyle.push(styles.buttonHighlighted);
    }

    return buttonStyle;
  }

  _getContentStyle() {
    let contentStyle = [styles.content];

    if (this.props.highlight) {
      contentStyle.push(styles.highlightedContent);
    }

    return contentStyle;
  }
}

Button.propTypes = {
  type: React.PropTypes.oneOf(types),
  highlight: React.PropTypes.bool,
  text: React.PropTypes.string,
  icon: React.PropTypes.string,
  onPress: React.PropTypes.func.isRequired,
  style: React.PropTypes.any,
  textStyle: React.PropTypes.any
};

Button.defaultProps = {
  type: types[0],
  highlight: false
};
