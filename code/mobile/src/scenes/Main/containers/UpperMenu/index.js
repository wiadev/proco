import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Container from '../../../../components/Container';
import Text from '../../../../components/Text';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const menuItems = [
  {
    title: "Update your question",
    action: () => Actions.UpdateYourQuestion()
  },
  {
    title: "Shoot a new profile loop",
    action: () => Actions.ShootNewProfileLoop()
  },
  {
    title: "Discovery filters",
    action: () => Actions.Filters()
  },
  {
    title: "Settings",
    action: () => Actions.Settings()
  }
];

//@connect(state => ({avatar: state.api.data.userInfo.avatar}))
export default class UpperMenu extends React.Component {
  render() {
    // TODO: Colors used in LinearGradient are not in color palette. Need to replace those colors or add them to palette.
    return (
      <Container>
        <View style={styles.logoRow}>
          <View style={styles.logoSideCushion} />

          <Image source={require('../../../../assets/images/logo.png')} style={styles.logo} />

          <View style={styles.logoSideCushion} />
        </View>

        <View style={styles.avatarRow}>
          <Image source={{uri: this.props.avatar}} style={styles.avatar} />
        </View>

        <View style={styles.menuRow}>
          {this._renderMenuItems()}
        </View>

        <Icon name="ios-arrow-down" style={styles.bottomArrowIcon} />
      </Container>
    );
  }

  _renderMenuItems() {
    return menuItems.map((menuItem, key) => {
      return (
        <TouchableOpacity key={key} onPress={menuItem.action} activeOpacity={0.7} style={styles.menuItem}>
          <Text style={styles.menuItemText}>{menuItem.title}</Text>
        </TouchableOpacity>
      );
    })
  }
}
