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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {loadPage, getMessageCount, defaultState, addMessage} from '../../scenes/Main/redux';
import Camera from 'react-native-camera';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import styles from '../../scenes/Main/styles';
import ImageSequence from 'react-native-image-sequence';

import MessageCountIcon from '../Messages/CountIcon';
import MessageBox from '../Messages/Box';
const images = [
  {uri: 'https://files.icoz.co/uploads/procolooptest01.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest02.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest03.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest04.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest05.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest06.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest07.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest08.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest09.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest10.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest11.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest12.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest13.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest14.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest15.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest16.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest17.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest18.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest19.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest20.jpg'},
  {uri: 'https://files.icoz.co/uploads/procolooptest21.jpg'},
];
images.forEach(image => Image.prefetch(image.uri));

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

    const states = this.props.mainScreenReducer;
    const messages = states.get('messageList').toJS().map((message, idx) => (
      <MessageBox key={'messages-' + idx} text={message.text} position="left"/>
    ));

    let rightContainerHeader = null;
    if (states.get('messageCount') > 0) {
      rightContainerHeader = (
        <MessageCountIcon messageCount={states.get('messageCount')}/>
      );
    }

    return (
      <View>
        <ImageSequence
          images={images}
          startFrameIndex={0}
          framesPerSecond={18}
          style={styles.backgroundImage}/>
        <View style={styles.preview}>
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
          </View>
      </View>
    );
  }
}
