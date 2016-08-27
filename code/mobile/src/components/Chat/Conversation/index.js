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
import Icon from 'react-native-vector-icons/FontAwesome';
import ChatComponent from 'react-native-gifted-messenger';
import MessageBox from '../Box';

import { styles, messengerStyle } from './styles';

class Conversation extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
   // this.state = store.getState().talkScreenReducer.toJS();
  }

  state = {};

  onPressBottomLeft() {
    Actions.pop();
  }

  onSend(message) {
    this.props.handleSend(message);
    this.refs.ChatComponent.onChangeText('');
  }

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        'Report',
        'Block',
        'Cancel',
      ],
      cancelButtonIndex: 2,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
        case 1:
        case 2:
        case 3:
      }
    });
  }

  render() {
    return (
      <View style={this.styles.preview}>
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
                  <Image style={this.styles.avatarImage} source={require('../../../assets/images/exampleAvatar.jpg')} />
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
            messages={this.props.messages}
            onCustomSend={::this.onSend}
            sendButtonText={'SEND'}
            renderCustomText={(props) => <MessageBox type={'chatScreen'} {...props} />}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Conversation;
