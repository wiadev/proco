import React from 'react';
import {
  View,
  Text,
  Switch,
  TouchableHighlight
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  MKRangeSlider
} from 'react-native-material-kit';

import styles from './styles';
import colors from '../../core/style/colors';

const types = ['bool', 'text', 'link', 'range', 'choice'];

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
            {this._renderLegend()}

            <Icon name="keyboard-arrow-right" style={styles.linkIcon} />
          </View>
        </TouchableHighlight>
      );
    }

    if (this.props.type === 'choice') {
      return (
        <TouchableHighlight onPress={() => this.props.onPress()} activeOpacity={0.96}>
          <View style={[this._getStyle(), this.props.style]}>
            {this._renderLegend()}

            {this._renderChoiceCheck()}
          </View>
        </TouchableHighlight>
      );
    }

    if (this.props.type === 'range') {
      return (
        <View style={[this._getStyle(), this.props.style]}>
          <View style={styles.multiRowFieldTopRow}>
            {this._renderLegend()}

            <Text style={styles.highlightedText}>{this.state.value[0]} - {this.state.value[1]}</Text>
          </View>

          {this._renderValue()}
        </View>
      );
    }

    return (
      <View style={[this._getStyle(), this.props.style]}>
        {this._renderLegend()}

        {this._renderValue()}
      </View>
    );
  }

  _renderLegend() {
    return (
      <Text style={styles.text}>{this.props.legend}</Text>
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

    if (this.props.type === 'range') {
      return (
        <MKRangeSlider
          min={this.props.minValue}
          max={this.props.maxValue}
          minValue={this.state.value[0]}
          maxValue={this.state.value[1]}
          onChange={value => this._onValueChange([_.round(value.min), _.round(value.max)])}
          lowerTrackColor={colors.primary1}
        />
      );
    }
  }

  _renderChoiceCheck() {
    if (this.props.value) {
      return (
        <Icon name="check" style={styles.choiceIcon} />
      );
    }
  }

  _getStyle() {
    let fieldStyle = [styles.field];

    if (this.props.type === 'range') {
      fieldStyle.push(styles.multiRowField);
    } else {
      fieldStyle.push(styles.singleRowField);
    }

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
  minValue: React.PropTypes.number,
  maxValue: React.PropTypes.number,
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
