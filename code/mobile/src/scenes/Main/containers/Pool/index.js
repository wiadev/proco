import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Swiper from "react-native-swiper";

import { trigger, action } from "../../../../modules/Pool/actions";
import PoolItem from "../../../../components/PoolItem";
import Card from "../../../../components/Card";
import PermissionModal from "../../../../components/PermissionModal";
import MessageCountIcon from '../../../../components/Chat/MessageCountIcon';
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
    this.props.dispatch(trigger());
  }

  componentWillReceiveProps(props) {
    if (props.pool.status === 'COMPLETED') {
      this.props.dispatch(trigger());
    }
  }

  render() {
    let renderCard = false;
    let cardLabel = "";
    let cardText = "";
    let cardInProgress = false;

    if (this.props.permissions.location !== 'authorized') {
      return (
        <PermissionModal type="location" />
      );
    }

    if (['IN_PROGRESS', 'IN_PROGRESS_RESET'].indexOf(this.props.pool.status.status) !== -1 && this.props.pool.items.length === 0) {
      renderCard = true;
      cardInProgress = true;
      cardLabel = "Just a sec";
      cardText = "Looking for awesome people nearby...";
    }

    if (this.props.pool.status.status === 'COMPLETED' && this.props.pool.items.length === 0) {
      renderCard = true;
      cardLabel = "Oh noes :(";
      cardText = "No one seems to nearby."
    }

    if (renderCard) {
      return (
        <Card label={cardLabel} text={cardText} noClose={true} activityIndicator={cardInProgress} />
      );
    } else {
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

          <View style={styles.messageIconWrapper}>
            <MessageCountIcon />
          </View>

        </View>
      );
    }
  }

  _renderPoolItems() {
    const poolItems = Object.keys(this.props.pool.items);
    let lastPoolItemKey = 0;

    let items = poolItems.map((poolItemKey, i) => {
      lastPoolItemKey = i;

      return (
        <PoolItem
          key={poolItemKey}
          isMounted={i === 0}
          data={this.props.pool.items[poolItemKey]}
          onComplete={(uid, act, payload) => this._doneWithPoolItem(uid, act, payload)}
        />
      );
    });

    items.push(
      <Card key={lastPoolItemKey + 1} label="Oh noes :(" text="No one else seems to be nearby." noClose={true} />
    );

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
      }
    });

    this.refs['swiper'].scrollBy(1);
  }
}
