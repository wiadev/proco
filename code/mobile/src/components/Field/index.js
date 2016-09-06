import React from 'react';
import {
  View,
  Text,
  Switch
} from 'react-native';

import styles from './styles';

const types = ['bool', 'text'];

const propTypes = {
  type: React.PropTypes.oneOf(types),
  readOnly: React.PropTypes.bool,
  legend: React.PropTypes.string,
  value: React.PropTypes.any,
  onChange: React.PropTypes.func,
  style: React.PropTypes.any
};

const defaultProps = {
  type: types[0],
  readOnly: false
};

class Field extends React.Component {
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
    return (
      <View style={[styles.field, this.props.style]}>
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

  _onValueChange(newValue) {
    this.setState({
      value: newValue
    });

    this.props.onChange(newValue);
  }
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
