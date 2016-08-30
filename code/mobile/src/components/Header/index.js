import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const actorTypes = ['icon', 'text'];

const propTypes = {
  title: React.PropTypes.string,
  leftActorType: React.PropTypes.oneOf(actorTypes),
  leftActor: React.PropTypes.string,
  leftAction: React.PropTypes.func,
  rightActorType: React.PropTypes.oneOf(actorTypes),
  rightActor: React.PropTypes.string,
  rightAction: React.PropTypes.func
};

const defaultProps = {

};

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={this._getColumnStyle('left')}>
          {this._renderLeftActor()}
        </View>

        <View style={this._getColumnStyle('middle')}>
          {this._renderTitle()}
        </View>

        <View style={this._getColumnStyle('right')}>
          {this._renderRightActor()}
        </View>
      </View>
    );
  }

  _renderTitle() {
    if (this.props.title) {
      return (
        <Text style={styles.title}>{this.props.title}</Text>
      );
    }
  }

  _renderActor(actorType, actor, action) {
    if (actorType === 'icon') {
      return (
        <Icon name={actor} size={24} onPress={action} />
      )
    }

    if (actorType === 'text') {
      return (
        <Text onPress={action}>{actor}</Text>
      );
    }
  }

  _renderLeftActor() {
    if (this.props.leftActorType && this.props.leftAction) {
      return this._renderActor(this.props.leftActorType, this.props.leftActor, this.props.leftAction);
    }
  }

  _renderRightActor() {
    if (this.props.rightActorType && this.props.rightAction) {
      return this._renderActor(this.props.rightActorType, this.props.rightActor, this.props.rightAction);
    }
  }

  _getColumnStyle(position) {
    let columnStyle = [styles.column];

    switch (position) {
      case 'left':
        columnStyle.push(styles.columnLeft);
        break;
      case 'middle':
        columnStyle.push(styles.columnMiddle);
        break;
      case 'right':
        columnStyle.push(styles.columnRight);
        break;
    }

    return columnStyle;
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
