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
import { connect } from 'react-redux';
import styles from '../../styles';
import PoolItem from '../../../../components/PoolItem';
import PermissionModal from '../../../../components/PermissionModal';
import {hideStatusBar, showStatusBar, setStatusBarStyle} from '../../../../modules/StatusBar/actions';
import IconM from 'react-native-vector-icons/MaterialIcons';

@connect(
  state => ({
    permissions: state.permissions,
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
    const items = [1];
    return (
      <View>
        <Swiper
          horizontal={true}
          loop={false}
          showsPagination={false}
        >
          {(this.props.permissions.location === 'authorized') ?
            this.renderPoolItems(items) : <PermissionModal type="location" />
          }
        </Swiper>
        <IconM
          name="expand-less"
          size={44}
          color="white"
          style={{ opacity: 0.5,
            backgroundColor: 'transparent',
            textAlign: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 10,
          }}
        />
      </View>
    );
  }
}
