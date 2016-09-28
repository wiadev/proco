import React from 'react';
import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Text from '../Text';
import styles from './styles';

const themes = ['dark', 'light'];
const titleTypes = ['text', 'logo'];
const actorTypes = ['text', 'icon'];

export default class Header extends React.Component {
  render() {
    return (
      <View style={this._getHeaderStyle()}>
        <StatusBar hidden={false} animated={true} />

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
    let content = null;
    switch (actorType) {
      case 'icon':
        content = <Icon name={actor} style={this._getActorIconStyle()} />;
        break;
      case 'text':
        content = <Text style={this._getTextStyle()}>{actor}</Text>;
        break;
      default: break;
    }

    return <TouchableOpacity hitSlop={{
      top: 5,
      left: 5,
      bottom: 5,
      right: 5,
    }} onPress={action}>{content}</TouchableOpacity>;
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
      case 'light':
        headerStyle.push(styles.headerLight);
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
    let textStyle = [styles.text];

    if (this.props.theme === 'light') {
      textStyle.push(styles.textOnLightTheme);
    }

    return textStyle;
  }

  _getActorIconStyle() {
    let actorIconStyle = [styles.actorIcon];

    if (this.props.theme === 'light') {
      actorIconStyle.push(styles.actorIconOnLightTheme);
    }

    return actorIconStyle;
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
  titleType: titleTypes[0],
  leftActorType: actorTypes[0],
  rightActorType: actorTypes[0]
};
