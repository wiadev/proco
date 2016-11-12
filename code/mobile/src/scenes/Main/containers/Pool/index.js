import React from "react";
import { connect } from "react-redux";
import { View, Animated, ListView, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import PoolInProgress from '../../../../components/PoolInProgress';
//import { trigger, action } from "../../../../modules/Pool/actions";
import PoolItem from "../../../../components/PoolItem";
import MessageCountIcon from "../../../../components/Chat/MessageCountIcon";

import styles from "./styles";

const AnimatedListView = Animated.createAnimatedComponent(ListView);
const data = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.uid !== r2.uid});

@connect(state => ({
  poolItems: state.pool.items,
  poolKeys: Object.keys(state.pool.items).slice(0, 3),
}))
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

  componentWillMount() {
    this._updatePoolData();
  }

  componentWillReceiveProps(props) {
    this._updatePoolData(props);
  }

  _updatePoolData(props = this.props) {

    const _data = {};
    props.poolKeys.forEach(key => _data[key] = props.poolItems[key]);

    this.setState({
      dataSource: data.cloneWithRows(_data),
    });
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
          dataSource={this.state.dataSource}
          pageSize={2}
          initialListSize={2}
          removeClippedSubviews={true}
          ref="poolList"
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderRow={(row) =>
            <PoolItem
              key={row.uid}
              onComplete={(uid, act, payload) => this._doneWithPoolItem(uid, act, payload)}
              {...row}
            />
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
    console.log("onswiperscroll", visibleRows, changedRows);
    const _visibleRows = Object.keys(visibleRows.s1);
    const _changedRows = Object.keys(changedRows.s1);

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
        transform: [
          {
            translateX: this.state.poolAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -(Dimensions.get('window').width)],
              extrapolate: 'clamp'
            }),
          },
          {
            translateY: this.state.poolAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, (Dimensions.get('window').height / 2)],
              extrapolate: 'clamp'
            }),
          }
        ],
      }
    ];
  }
}
