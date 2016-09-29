import React from "react";
import { connect } from "react-redux";
import { View, Animated, ListView, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { trigger, action } from "../../../../modules/Pool/actions";
import PoolItem from "../../../../components/PoolItem";
import Card from "../../../../components/Card";
import PermissionModal from "../../../../components/PermissionModal";
import MessageCountIcon from "../../../../components/Chat/MessageCountIcon";
import styles from "./styles";
let AnimatedListView = Animated.createAnimatedComponent(ListView)

@connect(state => ({permissions: state.permissions, pool: state.pool}))
export default class Pool extends React.Component {
  constructor(props) {
    super(props);

    let pan = new Animated.ValueXY();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      pan,
      dataSource: this.ds.cloneWithRows(Object.keys(this.props.pool.items)),
      dockAnimation: pan.y.interpolate({
        inputRange: [0, 240],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      })
    };

  }

  componentWillMount() {
    this.props.dispatch(trigger());
  }

  componentWillReceiveProps(props) {
    if (props.pool.status === 'COMPLETED') {
      this.props.dispatch(trigger());
    }
    this.setState({
      dataSource: this.ds.cloneWithRows(Object.keys(props.pool.items)),
    });
  }

  render() {
    let renderCard = false;
    let cardLabel = "";
    let cardText = "";
    let cardInProgress = false;

    if (this.props.permissions.location !== 'authorized') {
      return (
        <PermissionModal type="location"/>
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
        <Card label={cardLabel} text={cardText} noClose={true} activityIndicator={cardInProgress}/>
      );
    } else {
      return (
        <View style={styles.pool}>
          <AnimatedListView
            horizontal={true}
            pagingEnabled={true}
            style={this._getListViewStyle()}
            dataSource={this.state.dataSource}
            pageSize={2}
            removeClippedSubviews={true}
            renderRow={(poolItemKey) => <PoolItem
              key={poolItemKey}
              data={this.props.pool.items[poolItemKey]}
              onComplete={(uid, act, payload) => this._doneWithPoolItem(uid, act, payload)}
            />}
          />

          <Icon name="keyboard-arrow-up" style={styles.upperMenuIcon}/>

          <View style={styles.messageIconWrapper}>
            <MessageCountIcon />
          </View>

        </View>
      );
    }
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

  _getListViewStyle() {
    return [
      styles.pool,
      {
        width: this.state.dockAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [Dimensions.get('window').width, Dimensions.get('window').width * 2],
        }),
      },
      {
        transform: [
          {
            scale: this.state.dockAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.5],
              // extrapolate: 'clamp'
            }),
          },
          {
            translateX: this.state.dockAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -(Dimensions.get('window').width)],
              // extrapolate: 'clamp'
            }),
          },
          {
            translateY: this.state.dockAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, (Dimensions.get('window').height / 2)],
              // extrapolate: 'clamp'
            }),
          }
        ],
      }
    ];
  }
}
