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

import styles from './styles';

@connect(
  state => ({
    user: state.user,
  }),
)
class MainScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(setStatusBarStyle('light-content'));
  }

  render() {

    return (
      <View style={styles.container}>
        <Swiper
          horizontal={false}
          loop={false}
          showsPagination={false}
          index={2}
          onMomentumScrollEnd={
            (e, state) => {
              this.props.dispatch(showStatusBar());
            }
          }
          onScrollBeginDrag={
            (e, state) => this.props.dispatch(hideStatusBar())
          }
        >
          <GodMode />
          <UpperMenu fid={this.props.user.fid} />
          <Pool />
        </Swiper>
      </View>
    );
  }
}

export default MainScreen;
