import React from 'react';
import {connect} from "react-redux";
import {
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from "react-native-swiper";

import PoolItem from "../../../../components/PoolItem";
import Card from "../../../../components/Card";
import PermissionModal from "../../../../components/PermissionModal";
import {action} from '../../../../modules/Pool/actions';
import styles from './styles';

@connect(state => ({auth: state.auth, permissions: state.permissions, pool: state.pool}))
export default class Pool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
  }

  render() {
    if (this.props.permissions.location !== 'authorized') {
      return (
        <PermissionModal type="location" />
      );
    }

    return (
      <View style={styles.pool}>
        <Swiper
          horizontal={true}
          loop={false}
          showsPagination={false}
          onMomentumScrollEnd={(e, state) => this.setState({index: state.index})}
        >
          {this._renderPoolItems()}
        </Swiper>

        <Icon name="keyboard-arrow-up" style={styles.upperMenuIcon} />
      </View>
    );
  }

  _renderPoolItems() {
    const poolItems = Object.keys(this.props.pool.items);

    if (poolItems.length < 1) {
      return (
        <Card label="No one seems to be nearby" noClose={true} />
      );
    }

    return poolItems.map((poolItemKey, key) => {
      return (
        <PoolItem key={key} isMounted={key === this.state.index} data={this.props.pool.items[poolItemKey]} onComplete={(uid, act, payload) => this._doneWithPoolItem(uid, act, payload)} />
      );
    });
  }

  _doneWithPoolItem(uid, act, payload) {
    this.props.dispatch(action(uid, act, payload));
  }
}
