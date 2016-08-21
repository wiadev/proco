import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PixelRatio,
  StatusBar,
  TextInput,
  TouchableHighlight
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

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
  }

  state = {
    messageCount: 0,
    hideStatusBar: true,
    text: null,
  };

  componentDidMount() {
    this.props.dispatch(loadPage());
    this.props.dispatch(getMessageCount(3));
    this.props.dispatch(addMessage('En sevdigin dizi?', 'left'));
  }

  render() {

    const states = this.props.mainScreenReducer;
    const messages = states.get('messageList').toJS().map((message, idx) => (
      <MessageBox key={'messages-' + idx} text={message.text} position={message.position}/>
    ));

    let rightContainerHeader = null;
    if (states.get('messageCount') > 0) {
      rightContainerHeader = (
        <MessageCountIcon messageCount={states.get('messageCount')}/>
      );
    }

    return (
      <View>
          <View style={styles.preview}>
            {(this.state.text == null) ? <View style={styles.answerButton}>
               <Icon
                name="comment"
                size={22}
                color="#F9365F"
                style={styles.answerIcon}
                onPress={() => this.refs["1"].focus()}
              />
            </View> : null}
              <TextInput
                ref="1"
                placeholder="blurOnSubmit = false"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => console.log("sdf")}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                editable={true}
                multiline={true}
              />

            <View style={styles.messageList}>
              {messages}
              {(this.state.text !== null) ?
                <MessageBox text={this.state.text} position="right" /> : null}
            </View>
          </View>
      </View>
    );
  }
}
