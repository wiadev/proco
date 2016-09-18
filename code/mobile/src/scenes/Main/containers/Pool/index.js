import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Swiper from "react-native-swiper";
import { trigger, action } from "../../../../modules/Pool/actions";
import PoolItem from "../../../../components/PoolItem";
import Card from "../../../../components/Card";
import PermissionModal from "../../../../components/PermissionModal";
import styles from "./styles";

@connect(state => ({permissions: state.permissions, pool: state.pool}))
export default class Pool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      previousPoolData: {},
    };
  }

  componentWillMount() {
    this._poolGenerationCheck();
  }

  componentWillReceiveProps(props) {
    this._poolGenerationCheck(props);
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
          ref="swiper"
          onMomentumScrollEnd={(e, state) => this._onSwiperScroll(e, state)}
        >
          {this._renderPoolItems()}
        </Swiper>

        <Icon name="keyboard-arrow-up" style={styles.upperMenuIcon}/>
      </View>
    );
  }

  _renderPoolItems() {
    const poolItems = Object.keys(this.props.pool.items);

    let message = '...'; //@TODO: Find a solution for this state.

    switch (this.props.pool.status.status) {
      default:
        break;
      case 'EMPTY':
        message = 'No one seems to be nearby';
        break;
      case 'GENERATING':
        message = 'Finding great people nearby...';
        break;
    }

    if (poolItems.length < 1) {


      return (
        <Card label={message} noClose={true}/>
      );
    }

    const items = poolItems.map((poolItemKey, i) => {
      return (
        <PoolItem
          key={poolItemKey}
          isMounted={i === 0}
          data={this.props.pool.items[poolItemKey]}
          onComplete={(uid, act, payload) => this._doneWithPoolItem(uid, act, payload)}
        />
      );
    });

    if (poolItems.length === 1) {
      items.push(<Card key="0" label={message} noClose={true}/>);
    }

    return items;
  }

  _onSwiperScroll(e, state) {
    if (state.index !== 0) {
      const items = Object.keys(this.props.pool.items);
      const {uid = items[state.index - 1], act = 'skip', payload = null} = this.state.previousPoolData;
      this.props.dispatch(action(uid, act, payload));

      this.setState({
        current: state.index,
        previousPoolData: {},
      });
    }
  }

  _doneWithPoolItem(uid, act, payload) {
    this.setState({
      previousPoolData: {
        uid: uid,
        act: act,
        payload: payload,
      },
    });

    this.refs['swiper'].scrollBy(1);
  }

  _poolGenerationCheck(props = this.props) {
    if (!props.pool.status) {
      this.props.dispatch(trigger());
    }
  }
}
