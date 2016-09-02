import React, {Component} from "react";
import Conversation from "../../../components/Chat/Conversation";
import {getFacebookProfilePhotoUri} from "../../../components/FacebookProfilePhoto";
import {setStatusBarStyle} from "../../../modules/StatusBar/actions";
import {database} from "../../../core/Api";
import {assign} from "../../../core/utils";
import {GiftedChat} from "react-native-gifted-chat";
import {connect} from "react-redux";

const getConversationFromListRef = (uid, mid) => database.ref(`conversation-lists/${uid}/${mid}`);
const getUserBasicInfo = (uid) => database.ref(`users/${uid}/info`); //@TODO: revert this to info index
const getConversationsRef = () => database.ref(`conversations`);

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
      avatar: getFacebookProfilePhotoUri('batuhanicoz'),
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
      this.listeners.messageAdded = self.conversationRef.on('child_added', addedOrChanged);

      this.listeners.messageChanged = self.conversationRef.on('child_changed', addedOrChanged);

      this.listeners.messageRemoved = self.conversationRef.on('child_removed',
        async(snapshot) => {
          const key = await snapshot.key();

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

    this.listeners.matchedUser = getUserBasicInfo(this.props.uid)
      .once('value').then(snapshot => {
        const user = snapshot.val();
        this.setState({
          matchedUser: {
            name: user.first_name,
            uid: this.props.uid,
          }
        });
      });
  }

  componentDidMount() {
    this.props.dispatch(setStatusBarStyle('default'));
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

  render() {
    return (<Conversation
      onSend={::this.onSend}
      messages={this.state.messages}
      {...this.state.matchedUser}
    />);
  }
}
