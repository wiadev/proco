import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';

import Text from '../Text';
import Button from '../Button';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import colors from '../../core/style/colors';

export default class Card extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <View style={styles.container}>
          {this._renderActivityIndicator()}

          <Text style={styles.label}>{this.props.label}</Text>

          <Text style={styles.text}>{this.props.text}</Text>

          {this._renderButtons()}
        </View>
      </View>
    );
  }

  _renderActivityIndicator() {
    if (this.props.activityIndicator) {
      return (
        <ActivityIndicator size="large" color={colors.primaryAlt} style={styles.activityIndicator} />
      );
    }
  }

  _renderButtons() {
    let buttons = this.props.buttons;

    if (this.props.noClose === false) {
      buttons = buttons.concat([{
        text: "Close",
        onPress: Actions.pop
      }]);
    }

    if (buttons.length > 0) {
      return (
        <View style={styles.buttonList}>
          {buttons.map((button, key) => {
            return (
              <Button key={key} text={button.text} onPress={button.onPress} style={styles.button} />
            )
          })}
        </View>
      );
    }
  }
}

Card.propTypes = {
  label: React.PropTypes.string,
  text: React.PropTypes.string,
  noClose: React.PropTypes.bool,
  buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func.isRequired
  })),
  activityIndicator: React.PropTypes.bool
};

Card.defaultProps = {
  noClose: false,
  buttons: [],
  activityIndicator: false
};
