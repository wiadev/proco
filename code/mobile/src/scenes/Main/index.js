import React from 'react';
import {connect} from 'react-redux';
import {
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';

import UpperMenu from './containers/UpperMenu';
import Pool from './containers/Pool';
import GodMode from './containers/GodMode';
import MessageCountIcon from '../../components/Chat/CountIcon';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

@connect(state => ({user: state.user, isUser: state.isUser}))
export default class MainScreen extends React.Component {
  render() {
    return (
      <View style={styles.mainScreen}>
        {this._renderScreenSwiper()}

        <View style={styles.messageIconWrapper}>
          <MessageCountIcon messageCount={this.props.user.message_count || 0} onPress={Actions.ConversationList} />
        </View>

      </View>
    );
  }

  _renderScreenSwiper() {
    let swiperSlides = [
      <UpperMenu fid={this.props.user.fid} />,
      <Pool />
    ];

    if (this.props.isUser.god === true) {
      swiperSlides.unshift(<GodMode />);
    }

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
