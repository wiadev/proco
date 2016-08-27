import React, { Component } from 'react';
import Conversation from '../../../components/Chat/Conversation';
import { getFacebookProfilePhotoUri } from '../../../components/FacebookProfilePhoto';
import {setStatusBarStyle} from '../../../modules/StatusBar/actions';
import {database} from '../../../core/Api';
import {assign} from '../../../core/utils';
import {GiftedChat} from 'react-native-gifted-chat';

const getConversationFromListRef = (uid, mid) => database().ref().child(`conversation-lists/${uid}/${mid}`);
const getUserBasicInfo = (uid) => database().ref().child(`users/${uid}/info`); //@TODO: revert this to info index
const getConversationsRef = () => database().ref().child(`conversations`);

import { connect } from 'react-redux';

@connect(
  state => ({
    auth: state.auth,
    user: state.user,
  }),
)
export default class ConversationContainer extends Component {
  constructor(props) {
    super(props);
    this.listeners = {};
    this.currentUser = {
      name: props.user.first_name,
      '_id': props.auth.uid,
      avatar: getFacebookProfilePhotoUri(props.user.fid),
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
          messages: GiftedChat.append(previousState.messages, [message]),
        };
      });
    };

    const startListeners = (cid) => {
      self.conversationRef = getConversationsRef().child(cid);
      this.listeners.messageAdded = self.conversationRef.on('child_added', addedOrChanged);

      this.listeners.messageChanged = self.conversationRef.on('child_changed', addedOrChanged);

      this.listeners.messageRemoved = self.conversationRef.on('child_removed',
        async (snapshot) => {
          const key = await snapshot.key();

          const data = assign(this.state.messages, {
            [key]: undefined,
          });

          this.setState({data: data, messages: generateMessages(data)});
        });
    };

    if (!this.props.cid) {

      const listItem = getConversationFromListRef(this.props.auth.uid, this.props.uid);
      const listItemCIDRef = listItem.child('cid');

      listItemCIDRef.once('value', async(snapshot) => {
        let cid = await snapshot.val();

        if (cid === null) {
          self.conversationRef = getConversationsRef().push();
          cid = await self.conversationRef.key();
          listItemCIDRef.setValue(cid);
        }

        startListeners(cid);

      });

    } else {
      startListeners(this.props.cid);
    }

    this.listeners.matchedUser = getUserBasicInfo(this.props.uid).once('value', async (snapshot) => {
      const user = await snapshot.val();
      this.setState({matchedUser: {
        fid: user.fid,
        name: user.first_name,
        uid: this.props.uid,
      }});
    });
  }

  componentDidMount() {
    this.props.dispatch(setStatusBarStyle('default'));
  }

  onSend(messages) {
    messages.forEach(message => {
      const messageRef = this.conversationRef.push();
      messageRef.setValue({
        text: message.text,
        sender: this.props.auth.uid,
        createdAt: message.createdAt,
      });

    });
  }

  render() {
    return (<Conversation
      onSend={::this.onSend}
      messages={this.state.messages}
      {...this.state.matchedUser}
    />);
  }
}
