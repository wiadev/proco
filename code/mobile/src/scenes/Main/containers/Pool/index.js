import React from "react";
import {connect} from "react-redux";
import {View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Swiper from "react-native-swiper";
import {action} from "../../../../modules/Pool/actions";
import PoolItem from "../../../../components/PoolItem";
import Card from "../../../../components/Card";
import PermissionModal from "../../../../components/PermissionModal";
import styles from "./styles";

@connect(state => ({auth: state.auth, permissions: state.permissions, pool: state.pool}))
export default class Pool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      previousPoolData: {},
    };
  }

  render() {
    if (this.props.permissions.location !== 'authorized') {
      return (
        <PermissionModal type="location"/>
      );
    }

    return (
      <View style={styles.pool}>
        <Swiper
          horizontal={true}
          loop={false}
          showsPagination={false}
          loadMinimal={true}
          loadMinimalSize={2}
          ref="poolswiper"
          onMomentumScrollEnd={(e, state) => {

            const items = Object.keys(this.props.pool.items);
            const {uid = items[state.index - 1], act = 'skip', payload = null} = this.state.previousPoolData;
            this.props.dispatch(action(uid, act, payload));
            this.setState({
              current: state.index,
              previousPoolData: {},
            });

          }}
        >
          {this._renderPoolItems()}
        </Swiper>

        <Icon name="keyboard-arrow-up" style={styles.upperMenuIcon}/>
      </View>
    );
  }

  _renderPoolItems() {
    const poolItems = Object.keys(this.props.pool.items);

    if (poolItems.length < 1) {
      return (
        <Card label="No one seems to be nearby" noClose={true}/>
      );
    }

    return poolItems.map((poolItemKey, i) => {
      return (
        <PoolItem key={poolItemKey} isMounted={i === 0} data={this.props.pool.items[poolItemKey]}
                  onComplete={(uid, act, payload) => this._doneWithPoolItem(uid, act, payload)}
        />
      );
    });
  }

  _doneWithPoolItem(uid, act, payload) {
    this.setState({
      previousPoolData: {
        uid,
        act,
        payload,
      },
    });

    this.refs.poolswiper.scrollBy(1);
  }
}
