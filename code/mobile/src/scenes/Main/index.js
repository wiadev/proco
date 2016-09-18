import React from 'react';
import {connect} from 'react-redux';
import {
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';

import UpperMenu from './containers/UpperMenu';
import Pool from './containers/Pool';
import MessageCountIcon from '../../components/Chat/MessageCountIcon';
import styles from './styles';

@connect(state => ({user: state.api.data.userInfo, isUser: state.api.data.userIs}))
export default class MainScreen extends React.Component {
  render() {
    return (
      <View style={styles.mainScreen}>
        {this._renderScreenSwiper()}

        <View style={styles.messageIconWrapper}>
          <MessageCountIcon />
        </View>

      </View>
    );
  }

  _renderScreenSwiper() {
    let swiperSlides = [
      <UpperMenu fid={this.props.user.fid} />,
      <Pool />
    ];

    let swiperIndex = swiperSlides.length - 1;

    return (
      <Swiper horizontal={false} loop={false} showsPagination={false} index={swiperIndex}>
        {swiperSlides.map((slide, key) => {
          return (
            <View key={key} style={styles.swiperSlide}>
              {slide}
            </View>
          );
        })}
      </Swiper>
    );
  }
}
