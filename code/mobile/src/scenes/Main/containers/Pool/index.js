import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PixelRatio,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { loadPage, getMessageCount, defaultState, addMessage } from '../../redux';
import Camera from 'react-native-camera';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import Header from '../../../../components/Header';
import MessageCountIcon from '../../../../components/Messages/CountIcon';
import MessageBox from '../../../../components/Messages/Box';
import {getCorrectFontSizeForScreen} from '../../../../core/functions';
import styles from '../../styles';
import PoolItem from '../../../../components/PoolItem';

@connect(
  state => ({
    permissions: state.permissions,
    mainScreenReducer: state.mainScreenReducer,
  }),
)
export default class Pool extends Component {
  constructor(props) {
    super(props);
  }

  renderPoolItems(items) {
    return items.map((item, key) => {
      return (<PoolItem key={key} />);
    });
  }

  render() {
    const items = [1,2,3];
    return (
      <View>

        <Swiper
          horizontal={true}
          loop={false}
          showsPagination={false}
        >
          {this.renderPoolItems(items)}
        </Swiper>
      </View>
    );
  }
}
