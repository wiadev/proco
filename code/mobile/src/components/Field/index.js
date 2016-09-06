import React from 'react';
import {
  View,
  Text,
  Switch,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const types = ['bool', 'text', 'link'];

export default class Field extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: props.value
    });
  }

  render() {
    if (this.props.type === 'link') {
      return (
        <TouchableHighlight onPress={() => this.props.onPress()} activeOpacity={0.96}>
          <View style={[this._getStyle(), this.props.style]}>
            <Text style={styles.text}>{this.props.legend}</Text>

            <Icon name="keyboard-arrow-right" style={styles.linkIcon} />
          </View>
        </TouchableHighlight>
      );
    }

    return (
      <View style={[this._getStyle(), this.props.style]}>
        <Text style={styles.text}>{this.props.legend}</Text>

        {this._renderValue()}
      </View>
    );
  }

  _renderValue() {
    if (this.props.type === 'text') {
      return (
        <Text style={styles.text}>{this.state.value}</Text>
      );
    }

    if (this.props.type === 'bool') {
      return (
        <Switch value={this.state.value} onValueChange={value => this._onValueChange(value)} disabled={this.props.readOnly} />
      );
    }
  }

  _getStyle() {
    let fieldStyle = [styles.field];

    if (this.props.stickToPrevious) {
      fieldStyle.push(styles.stickToPrevious);
    }

    return fieldStyle;
  }

  _onValueChange(newValue) {
    this.setState({
      value: newValue
    });

    this.props.onChange(newValue);
  }
}

Field.propTypes = {
  type: React.PropTypes.oneOf(types),
  readOnly: React.PropTypes.bool,
  legend: React.PropTypes.string,
  value: React.PropTypes.any,
  onChange: React.PropTypes.func,
  onPress: React.PropTypes.func,
  stickToPrevious: React.PropTypes.bool,
  style: React.PropTypes.any
};

Field.defaultProps = {
  type: types[0],
  readOnly: false,
  stickToPrevious: false
};
