import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  ActionSheetIOS,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loadPage, defaultState, receivedMessage, sentMessage } from './redux';
import store from '../../store/configureStore';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChatComponent from 'react-native-gifted-messenger';
import MessageBox from '../MessageBox';

import { styles, messengerStyle } from './styles';

class TalkScreen extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
    this.state = store.getState().talkScreenReducer.toJS();
  }

  state = {};

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentDidMount() {
    store.dispatch(loadPage());
  }

  onPressBottomLeft() {
    Actions.pop();
  }

  onSend(message) {
    store.dispatch(sentMessage(message.text));
    this.setState(store.getState().talkScreenReducer.toJS());
    this.refs.ChatComponent.onChangeText('');
  }

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        'Mute Notifications',
        'Delete Conversation',
        'Unmatch',
        'Report & Block User',
        'Cancel',
      ],
      cancelButtonIndex: 4,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
        case 1:
        case 2:
        case 3:
          console.log('buttonIndex ' + buttonIndex);
          break;
      }
    });
  }

  render() {
    return (
      <View style={this.styles.preview}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
          hidden={false}
        />
        <View style={this.styles.topMenu}>
          <View style={this.styles.topMenuLeft}>
            <Icon
              name="angle-left"
              size={42}
              color="rgba(0, 0, 0, 0.3)"
              onPress={() => {
                Actions.pop();
              }}
            />
          </View>
          <View style={this.styles.topMenuMid}>
            <View style={this.styles.rowItem}>
              <View style={[this.styles.rowItemFirst]}>
                <View style={this.styles.rowItemImage}>
                  <Image style={this.styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')} />
                </View>
              </View>
              <View style={[this.styles.rowItemSecond]}>
                <Text style={this.styles.rowItemUsername}>{'Leyla'}</Text>
              </View>
            </View>
          </View>
          <View style={this.styles.topMenuRight}>
            <Icon
              name="navicon"
              size={24}
              color="rgba(0, 0, 0, 0.3)"
              onPress={::this.showActionSheet}
            />
          </View>
        </View>
        <ScrollView>
          <ChatComponent
            autoFocus={false}
            ref='ChatComponent'
            maxHeight={height - 70}
            blurOnSubmit={false}
            displayNames={false}
            loadEarlierMessagesButton={true}
            keyboardShouldPersistTaps={true}
            placeholder={'Your message?'}
            styles={messengerStyle}
            messages={this.state.messageList}
            onCustomSend={::this.onSend}
            sendButtonText={'SEND'}
            renderCustomText={(props) => <MessageBox type={'chatScreen'} {...props} />}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(() => defaultState.toJS())(TalkScreen);
