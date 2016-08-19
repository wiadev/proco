import React, { Component } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { loadPage, getMessageCount, defaultState, addMessage } from '../../scenes/Main/redux';
import Camera from 'react-native-camera';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import styles from '../../scenes/Main/styles';

import MessageCountIcon from '../Messages/CountIcon';
import MessageBox from '../Messages/Box';

@connect(
  state => ({
    permissions: state.permissions,
    mainScreenReducer: state.mainScreenReducer,
  }),
)
export default class PoolItem extends Component {
  constructor(props) {
    super(props);
    //this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
  }

  state = {
    messageCount: 0,
    hideStatusBar: true
  };

  componentDidMount() {
    this.props.dispatch(loadPage());
    setTimeout(() => {
      this.props.dispatch(getMessageCount(3));
      this.props.dispatch(addMessage('En sevdigin dizi?'));
    }, 3000);
  }

  render() {
/*
 https://files.icoz.co/uploads/procolooptest01.jpg
 https://files.icoz.co/uploads/procolooptest02.jpg
 https://files.icoz.co/uploads/procolooptest03.jpg
 https://files.icoz.co/uploads/procolooptest04.jpg
 https://files.icoz.co/uploads/procolooptest05.jpg
 https://files.icoz.co/uploads/procolooptest06.jpg
 https://files.icoz.co/uploads/procolooptest07.jpg
 https://files.icoz.co/uploads/procolooptest08.jpg
 https://files.icoz.co/uploads/procolooptest09.jpg
 https://files.icoz.co/uploads/procolooptest10.jpg
 https://files.icoz.co/uploads/procolooptest11.jpg
 https://files.icoz.co/uploads/procolooptest12.jpg
 https://files.icoz.co/uploads/procolooptest13.jpg
 https://files.icoz.co/uploads/procolooptest14.jpg
 https://files.icoz.co/uploads/procolooptest15.jpg
 https://files.icoz.co/uploads/procolooptest16.jpg
 https://files.icoz.co/uploads/procolooptest17.jpg
 https://files.icoz.co/uploads/procolooptest18.jpg
 https://files.icoz.co/uploads/procolooptest19.jpg
 https://files.icoz.co/uploads/procolooptest20.jpg
 https://files.icoz.co/uploads/procolooptest21.jpg
 */
    const states = this.props.mainScreenReducer;
    const messages = states.get('messageList').toJS().map((message, idx) => (
      <MessageBox key={'messages-' + idx} text={message.text} position="left" />
    ));

    let rightContainerHeader = null;
    if (states.get('messageCount') > 0) {
      rightContainerHeader = (
        <MessageCountIcon messageCount={states.get('messageCount')} />
      );
    }

    return (
      <View style={styles.defScreen}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        >
          <IconM
            name="expand-less"
            size={44}
            color="white"
            style={{ opacity: 0.5,
              backgroundColor: 'transparent',
              textAlign: 'center',
              alignItems: 'center',
              position: 'absolute',
              left: 0,
              right: 0,
              top: 10,
            }}
          />
          <View style={styles.answerButton}>
            <Icon
              name="comment"
              size={22}
              color="#F9365F"
              style={styles.answerIcon}
            />
          </View>
          <View style={styles.messageList}>
            {messages}
          </View>
        </Camera>
      </View>
    );
  }
}
