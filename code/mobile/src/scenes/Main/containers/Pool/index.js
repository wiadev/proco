import React from 'react';
import {connect} from "react-redux";
import {
  View,
Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from "react-native-swiper";
import _ from 'lodash';

import {database} from '../../../../core/Api';
import PoolItem from "../../../../components/PoolItem";
import Card from "../../../../components/Card";
import PermissionModal from "../../../../components/PermissionModal";
import styles from './styles';

@connect(state => ({auth: state.auth, permissions: state.permissions, pool: state.pool}))
class Pool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  render() {
    if (this.props.permissions.location !== 'authorized') {
      return (
        <PermissionModal type="location" />
      );
    }
console.log(this.state)
    return (
      <View style={styles.pool}>
        <Swiper
          horizontal={true}
          loop={false}
          showsPagination={false}
          onMomentumScrollEnd={(e, state, context) => {
            this.setState({
              index: state.index
            });
          }}
        >
          {this._renderPoolItems()}
        </Swiper>

        <Icon name="keyboard-arrow-up" style={styles.upperMenuIcon} />
      </View>
    );
  }

  _renderPoolItems() {
    const poolItems = this.props.pool.items;
    const poolItemKeys = Object.keys(poolItems);

    if (poolItemKeys.length < 1) {
      return (
        <Card label="No one seems to be nearby" noClose={true} />
      );
    }

    return poolItemKeys.map((item, key) => {
      return (
        <PoolItem key={key} isMounted={key === this.state.index} {...poolItems[item]} />
      );
    });
  }
}

export default Pool;
