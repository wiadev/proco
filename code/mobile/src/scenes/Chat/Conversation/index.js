import React, { Component } from 'react';
import Conversation from '../../../components/Chat/Conversation';
import { getFacebookProfilePhotoUri } from '../../../components/FacebookProfilePhoto';
import {setStatusBarStyle} from '../../../modules/StatusBar/actions';
import {database} from '../../../core/Api';
import {assign} from '../../../core/utils';
import {GiftedChat} from 'react-native-gifted-chat';

const getConversationFromListRef = (uid, mid) => database().ref().child(`conversation-lists/${uid}/${mid}`);
const getUserBasicInfo = (uid) => database().ref().child(`users/${uid}/info`); //@TODO: revert this to info index
const getConversationsRef = (cid = null) => database().ref().child(`conversations/${cid || null}`);

import { connect } from 'react-redux';

@connect(
  state => ({
    auth: state.auth,
  }),
)
export default class ConversationContainer extends Component {
  constructor(props) {
    super(props);
    this.listeners = {};
    this.currentUser = {
      name: this.props.user.first_name,
      '_id': this.props.auth.uid,
      avatar: getFacebookProfilePhotoUri(this.props.user.fid),
    };
    this.conversationRef = null;
  }

  state = {
    list: [],
    matchedUser: {}
  };

  componentWillUnmount() {
    Object.keys(this.listeners).forEach(key => this.listeners[key]());
  }

  componentWillMount() {

    const self = this;
    const generateMessage = (message, key) => {
      message['_id'] = key;
      message['user'] = (message['sender'] === this.props.auth.uid) ? this.currentUser : this.state.matchedUser;
      return message;
    };

    const addedOrChanged = async (snapshot) => {
      const key = await snapshot.key();
      const _message = await snapshot.val();
      const message = generateMessage(_message, key);

      this.setState((previousState) => {
        return {
          data: data,
          messages: GiftedChat.append(previousState.messages, [message]),
        };
      });
    };

    const listItem = getConversationFromListRef(this.props.auth.uid, this.props.uid);
    const listItemCIDRef = listItem.child('cid');

    listItemCIDRef.child('cid').once('value', async (snapshot) => {
      let cid = await snapshot.val();

      if (cid === null) {
        self.conversationRef = getConversationsRef().push();
        cid = await conversationRef.key();
        listItemCIDRef.set(cid);
      } else {
        self.conversationRef = getConversationsRef(cid);
      }

      this.listeners.messageAdded = conversationRef.on('child_added', addedOrChanged);

      this.listeners.messageChanged = conversationRef.on('child_changed', addedOrChanged);

      this.listeners.messageRemoved = conversationRef.on('child_removed',
        async (snapshot) => {
          const key = await snapshot.key();

          const data = assign(this.state.messages, {
            [key]: undefined,
          });

          this.setState({data: data, messages: generateMessages(data)});
        });


    });

    this.listeners.matchedUser = getUserBasicInfo(this.props.uid).on('once', async (snapshot) => {
      const user = await snapshot.val();
      this.setState({matcheduser: user});
    });
  }

  componentDidMount() {
    this.props.dispatch(setStatusBarStyle('default'));
  }

  handleSend(text) {
    this.conversationRef.push({
      text
    });
  }
  render() {
    return (<Conversation
      user={::this.currentUser}
      fid="123"
      handleSend={::this.handleSend}
      messages={this.state.messages}
    />);
  }
}
