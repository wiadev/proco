import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PixelRatio,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import UpperMenu from './containers/UpperMenu';
import Pool from './containers/Pool';
import {hideStatusBar, showStatusBar, setStatusBarStyle} from '../../modules/StatusBar/actions';
import GodMode from './containers/GodMode';
import MessageCountIcon from '../../components/Messages/CountIcon';
import IconM from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

@connect(
  state => ({
    user: state.user,
    isUser: state.isUser,
  }),
)
class MainScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(setStatusBarStyle('light-content'));
  }

  renderPages(arr) {
    if (this.props.isUser.god) {
      arr.unshift(<GodMode />);
    }
    return arr.map((el, i) => {
      return <View key={i}>{el}</View>;
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Swiper
          horizontal={false}
          loop={false}
          showsPagination={false}
          index={((this.props.isUser.god === true) ? 2 : 1)}
          onMomentumScrollEnd={
            (e, state) => {
              this.props.dispatch(showStatusBar());
            }
          }
          onScrollBeginDrag={
            (e, state) => this.props.dispatch(hideStatusBar())
          }
        >
          {this.renderPages([
            <UpperMenu fid={this.props.user.fid} />,
            <Pool />
          ])}
        </Swiper>
        <View style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}><MessageCountIcon messageCount={5} /></View>

      </View>
    );
  }
}

export default MainScreen;
