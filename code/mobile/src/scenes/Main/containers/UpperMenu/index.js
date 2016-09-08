import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

import FacebookProfilePhoto from '../../../../components/FacebookProfilePhoto';

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

export default class UpperMenu extends React.Component {
  render() {
    // TODO: Colors used in LinearGradient are not in color palette. Need to replace those colors or add them to palette.
    return (
      <View style={styles.upperMenu}>
        <Image source={require('../../../../assets/images/stock-photo-56093412-selfi-man-with-his-dog-.jpg')} style={styles.backgroundImage}>
          <LinearGradient colors={['rgba(59, 28, 255, 0.8)', 'rgba(249, 54, 95, 0.8)']} style={styles.backgroundLinearGradient}>
            <View style={styles.avatarRow}>
              <FacebookProfilePhoto styles={styles.avatar} fid={this.props.fid} size="large" />
            </View>

            <View style={styles.menuRow}>
              {this._renderMenuItems()}
            </View>

            <View style={styles.bottomArrowRow}>
              <Icon name="keyboard-arrow-down" style={styles.bottomArrowIcon} />
            </View>
          </LinearGradient>
        </Image>
      </View>
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
