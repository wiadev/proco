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

@connect(state => ({auth: state.auth, permissions: state.permissions}))
class Pool extends React.Component {
  constructor(props) {
    super(props);

    this.ref = database.ref(`pools/${this.props.auth.uid}`).limitToFirst(5);

    this.state = {
      index: 0,
      poolItems: []
    };
  }

  componentWillMount() {
    this.ref.on('child_added', newPoolItem => {
      console.log("child added", newPoolItem.key);
      this.setState({
        poolItems: this.state.poolItems.concat([{userId: newPoolItem.key}])
      });
    });

    this.ref.on('child_removed', deletedPoolItem => {
      console.log("child child_removed", deletedPoolItem.key);
      this.setState({
        poolItems: _.filter(this.state.poolItems, singlePoolItem => {
          return singlePoolItem.userId === deletedPoolItem.key;
        })
      });
    });

    // TODO: Update poolItem on child_changed event.
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
    if (this.state.poolItems.length < 1) {
      return (
        <Card label="No one seems to be nearby" noClose={true} />
      );
    }

    return this.state.poolItems.map((item, key) => {
      return (
        <PoolItem key={key} isMounted={key === this.state.index} userId={item.userId} />
      );
    });
  }
}

export default Pool;
