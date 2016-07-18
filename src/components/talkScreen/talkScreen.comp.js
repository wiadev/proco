import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
  Image,
  ActionSheetIOS,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loadPage, defaultState, receivedMessage, sentMessage } from './talkScreen.reducer';
import store from './../../store/configureStore';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChatComponent from 'react-native-gifted-messenger';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  preview: {
    position: 'relative',
    height,
    width,
    backgroundColor: '#dadada',
  },
  topMenu: {
    paddingTop: 20,
    height: 65,
    width,
    backgroundColor: 'white',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 0.5,
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
  },
  topMenuLeft: {
    flex: 0,
    width: width * 25 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  topMenuRight: {
    flex: 0,
    width: width * 25 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  btnSave: {
    color: 'rgb(71,71,71)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    textAlign: 'center',
  },
  topMenuMid: {
    flex: 0,
    width: width * 50 / 100,
    position: 'relative',
    alignItems: 'center',
  },
  menuTitle: {
    color: 'rgb(249,54,95)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 17,
    textAlign: 'center',
  },
  rowItem: {
    width: width * 70 / 100,
    backgroundColor: 'white',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rowItemLeft: {
    flex: 0,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  rowItemImage: {
    height: 34,
    width: 34,
    margin: 0,
    borderRadius: 28,
    borderWidth: 0,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 34,
    height: 34,
    margin: 0,
  },
  rowItemUsername: {
    fontSize: 16,
    color: 'rgb(249,54,95)',
    fontFamily: 'Montserrat-Regular',
  },
  rowItemUserTitle: {
    fontSize: 12,
    color: 'rgb(139,139,139)',
    fontFamily: 'Montserrat-Light',
  },
  rowItemSecond: {
    marginLeft: 10,
    marginTop: -3,
  },
});

const messengerStyle = {
  sendButton: {
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    backgroundColor: 'rgb(86,54,234)',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 5,
    width: 90,
  },
  bubbleRight: {
    backgroundColor: 'rgb(86,54,234)',
  },
  bubbleLeft: {
    backgroundColor: 'rgb(249,54,95)',
  },
  textLeft: {
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
    color: 'white',
  },
  textRight: {
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
    color: 'white',
  },
};

class talkScreenComp extends Component {
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
                  <Image style={this.styles.avatarImage} source={require('./../../images/exampleAvatar.jpg')} />
                </View>
              </View>
              <View style={[this.styles.rowItemSecond]}>
                <Text style={this.styles.rowItemUsername}>{'Leyla'}</Text>
                <Text style={this.styles.rowItemUserTitle}>{'Bogazici University'}</Text>
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
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(() => defaultState.toJS())(talkScreenComp);
