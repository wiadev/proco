import React from 'react';
import {
  View,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from '../Text';
import styles from './styles';

const themes = ['dark', 'light'];
const titleTypes = ['text', 'logo'];
const actorTypes = ['icon', 'text'];

export default class Header extends React.Component {
  render() {
    return (
      <View style={this._getHeaderStyle()}>
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
    if (this.props.theme === 'dark' && this.props.titleType === 'logo') {
      return (
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      );
    }

    if (this.props.titleType === 'text' && this.props.title) {
      return (
        <Text style={[styles.title, this._getTextStyle()]}>{this.props.title}</Text>
      );
    }
  }

  _renderActor(actorType, actor, action) {
    if (actorType === 'icon') {
      return (
        <Icon name={actor} size={24} onPress={action} style={this._getIconStyle()} />
      )
    }

    if (actorType === 'text') {
      return (
        <Text onPress={action} style={this._getTextStyle()}>{actor}</Text>
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

  _getHeaderStyle() {
    let headerStyle = [styles.header];

    switch (this.props.theme) {
      case 'dark':
        headerStyle.push(styles.headerDark);
    }

    return headerStyle;
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

  _getTextStyle() {
    if (this.props.theme === 'dark') {
      return styles.textOnDarkTheme;
    }
  }

  _getIconStyle() {
    if (this.props.theme === 'dark') {
      return styles.iconOnDarkTheme;
    }
  }
}

Header.propTypes = {
  theme: React.PropTypes.oneOf(themes).isRequired,
  titleType: React.PropTypes.oneOf(titleTypes),
  title: React.PropTypes.string,
  leftActorType: React.PropTypes.oneOf(actorTypes),
  leftActor: React.PropTypes.string,
  leftAction: React.PropTypes.func,
  rightActorType: React.PropTypes.oneOf(actorTypes),
  rightActor: React.PropTypes.string,
  rightAction: React.PropTypes.func
};

Header.defaultProps = {
  titleType: titleTypes[0]
};
