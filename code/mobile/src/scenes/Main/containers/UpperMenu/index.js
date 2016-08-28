import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PixelRatio,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {getCorrectFontSizeForScreen} from '../../../../core/functions';
import styles from '../../styles';

import Header from '../../../../components/Header';
import FacebookProfilePhoto from '../../../../components/FacebookProfilePhoto';

export default class UpperMenu extends Component {
  render() {
    return (

      <View style={styles.preview}>
        <Image style={styles.backgroundImage}
               source={require('../../../../assets/images/stock-photo-56093412-selfi-man-with-his-dog-.jpg')}/>
        <LinearGradient colors={['rgba(59, 28, 255, 0.8)', 'rgba(249, 54, 95, 0.8)']} style={styles.preview}>
          <Header
            hideLeft={true}
            hideRight={true}
          />
          <FacebookProfilePhoto fid={this.props.fid} />
          <View style={styles.menuList}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText} onPress={Actions.UpdateYourQuestionScreen}>
                Update your question
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText} onPress={Actions.ShootNewProfileLoop}>
                Shoot a new profile loop
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText} onPress={Actions.Filters}>
                Discovery Filters
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText} onPress={Actions.Settings}>
                Settings
              </Text>
            </View>
          </View>
          <IconM
            name="expand-more"
            size={44}
            color="white"
            style={{
              opacity: 0.8,
              backgroundColor: 'transparent',
              textAlign: 'center',
              alignItems: 'center',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 15,
            }}
          />
        </LinearGradient>
      </View>

    );
  }
}
