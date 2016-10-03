import React from 'react';
import {connect} from 'react-redux';
import {
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';

import UpperMenu from './containers/UpperMenu';
import Pool from './containers/Pool';
import styles from './styles';

@connect(state => ({user: state.api.data.userInfo, isUser: state.api.data.userIs}))
export default class MainScreen extends React.Component {
  render() {
    return (
      <View style={styles.mainScreen}>
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
