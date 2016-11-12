import React from "react";
import { connect } from "react-redux";
import { View, Animated, ListView, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PoolInProgress from "../../../../components/PoolInProgress";
import PoolItem from "../../../../components/PoolItem";
import styles from "./styles";
import { action } from "../../../../modules/pool/actions";

const AnimatedListView = Animated.createAnimatedComponent(ListView);

@connect(
  state => ({
    poolItems: state.pool.items,
    poolKeys: state.pool.keys,
    poolData: state.pool.data,
  }),
  dispatch => ({
    takeAction: (uid, act, payload) => dispatch(action(uid, act, payload)),
  }),
)
export default class Pool extends React.Component {
  constructor(props) {
    super(props);

    let pan = new Animated.ValueXY();

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

  render() {

    if (this.props.poolKeys.length < 1) {
      return (
        <PoolInProgress />
      );
    }

    return (
      <View style={styles.pool}>
        <AnimatedListView
          horizontal={true}
          pagingEnabled={true}
          style={this._getListViewStyle()}
          dataSource={this.props.poolData}
          pageSize={1}
          initialListSize={1}
          ref="poolList"
          enableEmptySections={false}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderRow={(row) =>
            <View style={styles.poolItemO}>
              <PoolItem
                key={row.uid}
                onComplete={(uid, act, payload) => this._doneWithPoolItem(uid, act, payload)}
                {...row}
              />
            </View>
          }
          onChangeVisibleRows={::this._onSwiperScroll}
        />

        <Icon name="keyboard-arrow-up" style={styles.upperMenuIcon}/>

        {/*<View style={styles.messageIconWrapper}>*/}
        {/*<MessageCountIcon />*/}
        {/*</View>*/}

      </View>
    );
  }

  _doneWithPoolItem(uid, act = 'skip', payload = {}) {
    console.log("u", uid, act, payload)
    this.props.takeAction(uid, act, payload);
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
    console.log("onswiperscroll1", visibleRows, changedRows);

    const _visibleRows = Object.keys(visibleRows.s1);
    const _changedRows = Object.keys(changedRows.s1);

    console.log("onswiperscroll", _visibleRows, _changedRows);
    return;
    if (_visibleRows.length === 1 && _changedRows.length === 1) {

      console.log("here");
      const gone = _changedRows[0];

      // this.props.dispatch(action(gone));

      this.refs.poolList._component.scrollTo({
        x: 0,
        y: 0,
        animated: false,
      });

      const come = _visibleRows[0];
      console.log(gone, come);
      this.setState({
        current: {
          uid: come,
        },
      });


    }
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
