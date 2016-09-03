import React from "react";
import {GiftedChat} from "react-native-gifted-chat";
import {connect} from "react-redux";

import Conversation from "../../../components/Chat/Conversation";
import {setStatusBarStyle} from "../../../modules/StatusBar/actions";
import {database, getUserSummary} from "../../../core/Api";
import {assign} from "../../../core/utils";

const getConversationFromListRef = (uid, mid) => database.ref(`conversation-lists/${uid}/${mid}`);
const getUserBasicInfo = (uid) => database.ref(`users/${uid}/info`); //@TODO: revert this to info index
const getConversationsRef = () => database.ref(`conversations`);

@connect(
  state => ({
    auth: state.auth,
    user: state.user,
  }),
)
export default class ConversationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.listeners = {};
    this.currentUser = {
      name: props.user.first_name,
      '_id': props.auth.uid,
      avatar: props.user.avatar
    };

    this.conversationRef = null;
  }

  state = {
    list: [],
    matchedUser: {}
  };

  componentWillUnmount() {
    if (this.conversationRef) {
      this.conversationRef.off();
    }
  }

  componentWillMount() {
    const self = this;
    const generateMessage = (message, key) => {
      message['_id'] = key;
      message['user'] = (message['sender'] === this.props.auth.uid) ? this.currentUser : this.state.matchedUser;
      return message;
    };

    const addedOrChanged = (snapshot) => {
      const key = snapshot.key;
      const _message = snapshot.val();
      const message = generateMessage(_message, key);

      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, [message]),
        };
      });
    };

    const startListeners = (cid) => {
      self.conversationRef = getConversationsRef().child(cid);
      self.conversationRef.on('child_added', addedOrChanged);

      self.conversationRef.on('child_changed', addedOrChanged);

      self.conversationRef.on('child_removed',
        (snapshot) => {
          const key = snapshot.key;

          const data = assign(this.state.messages, {
            [key]: undefined,
          });

          this.setState({data: data, messages: generateMessage(data)});
        });
    };

    if (!this.props.cid) {

      const listItem = getConversationFromListRef(this.props.auth.uid, this.props.uid);
      const listItemCIDRef = listItem.child('cid');

      listItemCIDRef.once('value').then(snapshot => {
        let cid = snapshot.val();

        if (cid === null) {
          self.conversationRef = getConversationsRef().push();
          cid = self.conversationRef.key;
          listItemCIDRef.set(cid);
        }

        startListeners(cid);
      });

    } else {
      startListeners(this.props.cid);
    }

    getUserSummary(this.props.uid).then(user => {
      console.log("got user", user)
      this.setState({matchedUser: Object.assign({
        uid: this.props.uid,
      }, user)})
    });
  }

  componentDidMount() {
    this.props.dispatch(setStatusBarStyle('default'));
  }

  render() {
    console.log(this.state);
    return (<Conversation
      onSend={::this.onSend}
      messages={this.state.messages}
      {...this.state.matchedUser}
    />);
  }

  onSend(messages) {
    messages.forEach(message => {
      const messageRef = this.conversationRef.push({
        text: message.text,
        sender: this.props.auth.uid,
        createdAt: message.createdAt,
      });
    });
  }
}
