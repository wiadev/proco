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

let AnimatedListView = Animated.createAnimatedComponent(ListView);

@connect(state => ({
  permissions: state.permissions,
  pool: state.pool,
  poolItems: state.pool.items,
  poolKeys: Object.keys(state.pool.items),
}))
export default class Pool extends React.Component {
  constructor(props) {
    super(props);

    let pan = new Animated.ValueXY();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
      console.log(r1, r2);
      return r1.uid !== r2.uid;
    }});

    this.state = {
      pan,
      poolAnimation: pan.y.interpolate({
        inputRange: [0, 240],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      current: {},
    };

  }

  componentWillMount() {
    this.props.dispatch(trigger());
    this.setState({
      dataSource: this.ds.cloneWithRows(this.props.poolKeys),
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      dataSource: this.ds.cloneWithRows(props.poolKeys),
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
    }
    return (
      <View style={styles.pool}>
        <AnimatedListView
          horizontal={true}
          pagingEnabled={true}
          style={this._getListViewStyle()}
          dataSource={this.state.dataSource}
          pageSize={2}
          initialListSize={2}
          removeClippedSubviews={true}
          enableEmptySections={true}
          renderRow={(key) => <PoolItem
            key={key}
            onComplete={(uid, act, payload) => this._doneWithPoolItem(uid, act, payload)}
            {...this.props.poolItems[key]}
          />}
          onChangeVisibleRows={::this._onSwiperScroll}
        />

        <Icon name="keyboard-arrow-up" style={styles.upperMenuIcon}/>

        <View style={styles.messageIconWrapper}>
          <MessageCountIcon />
        </View>

      </View>
    );
  }

  _setCurrentPoolData(uid, act = 'skip', payload = {}) {
    this.setState({
      current: {
        uid,
        act,
        payload,
      },
    });
  }

  _onSwiperScroll(visibleRows, changedRows) {

    console.log(visibleRows, changedRows);

    const keys = this.props.poolKeys;
    const gone = Object.keys(changedRows.s1).filter(key => !changedRows.s1[key]);
    if (gone.length === 1) {
      this.props.dispatch(action(keys[gone[0]]));
    }

    const visible = Object.keys(visibleRows.s1).filter(key => visibleRows.s1[key])[0];

    console.log("now visible", visible);

  }

  _getListViewStyle() {
    return [
      styles.pool,
      {
        width: this.state.poolAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [Dimensions.get('window').width, Dimensions.get('window').width * 2],
        }),
      },
      {
        transform: [
          {
            scale: this.state.poolAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.5],
              // extrapolate: 'clamp'
            }),
          },
          {
            translateX: this.state.poolAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -(Dimensions.get('window').width)],
              // extrapolate: 'clamp'
            }),
          },
          {
            translateY: this.state.poolAnimation.interpolate({
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
