import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';

import UpperMenu from './containers/UpperMenu';
import Pool from './containers/Pool';
import styles from './styles';

export default class MainScreen extends React.Component {
  render() {
    return (
      <View style={styles.mainScreen}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        {this._renderScreenSwiper()}
      </View>
    );
  }

  _renderScreenSwiper() {
    return (
      <Swiper horizontal={false} loop={false} showsPagination={false} index={1}>
        <UpperMenu />
        <Pool />
      </Swiper>
    );
  }
}
