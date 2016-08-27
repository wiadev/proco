import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  ActionSheetIOS,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GiftedChat} from 'react-native-gifted-chat';
import MessageBox from '../Box';
import FacebookProfilePhoto from '../../FacebookProfilePhoto';
import { styles, messengerStyle } from './styles';

const height = Dimensions.get('window').height;

class Conversation extends Component {

  constructor(props) {
    super(props);
   // this.state = store.getState().talkScreenReducer.toJS();
  }

  state = {};

  onPressBottomLeft() {
    Actions.pop();
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
      <View style={styles.preview}>
        <View style={styles.topMenu}>
          <View style={styles.topMenuLeft}>
            <Icon
              name="angle-left"
              size={42}
              color="rgba(0, 0, 0, 0.3)"
              onPress={() => {
                Actions.pop();
              }}
            />
          </View>
          <View style={styles.topMenuMid}>
            <View style={styles.rowItem}>
              <View style={[styles.rowItemFirst]}>
                <View style={styles.rowItemImage}>
                  <FacebookProfilePhoto styles={styles.avatarImage} fid={this.props.fid} />
                </View>
              </View>
              <View style={[styles.rowItemSecond]}>
                <Text style={styles.rowItemUsername}>{this.props.name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.topMenuRight}>
            <Icon
              name="navicon"
              size={24}
              color="rgba(0, 0, 0, 0.3)"
              onPress={::this.showActionSheet}
            />
          </View>
        </View>
        <ScrollView>
          <GiftedChat
            autoFocus={false}
            ref='Chat'
            maxHeight={height - 70}
            blurOnSubmit={false}
            displayNames={false}
            loadEarlierMessagesButton={true}
            keyboardShouldPersistTaps={true}
            placeholder={'Your message?'}
            styles={messengerStyle}
            messages={this.props.messages}
            onSend={::this.props.onSend}
            sendButtonText={'SEND'}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Conversation;
