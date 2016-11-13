import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

@connect(state => ({threads: state.chat.threads, profiles: state.profiles.profiles}))
export default class MessageCountIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unseenThreads: {},
      users: []
    };
  }

  componentWillMount() {
    this.props.threads.unseen.map(threadId => this._checkUnseenThread(threadId));
  }

  componentDidUpdate() {
    this.props.threads.unseen.map(threadId => this._checkUnseenThread(threadId));
  }

  render() {
    return (
      <TouchableOpacity onPress={Actions.ConversationList} activeOpacity={0.6} style={styles.messageCountIcon}>
        <View style={styles.avatars}>
          {this.state.users.map((userId, key) => this._renderAvatar(userId, key))}
        </View>

        <Icon name="ios-chatbubbles" style={styles.icon} />

        <View style={styles.iconContentWrapper}>
          <View style={styles.iconContent}>
            <Text style={styles.messagesCount}>{this._renderUnreadMessageCount()}</Text>
          </View>
        </View>

        {this._renderUnreadIndicator()}
      </TouchableOpacity>
    );
  }

  _renderUnreadMessageCount() {
    if (this.props.threads.unseen.length > 99) {
      return '99+';
    } else {
      return this.props.threads.unseen.length;
    }
  }

  _renderUnreadIndicator() {
    if (this.props.threads.unseen.length !== 0) {
      return (
        <View style={styles.unreadIndicator}>
          <View style={styles.unreadIndicatorInner} />
        </View>
      );
    }
  }

  _renderAvatar(userId, key) {
    if (this.props.profiles.hasOwnProperty(userId)) {
      return (
        <Image
          key={key}
          source={{uri: this.props.profiles[userId].avatar}}
          style={styles.avatar}
        />
      );
    }
  }

  _addUnseenThread(threadId) {
    const timestamp = this.props.threads.threads[threadId].last_message.createdAt;
    const userId = this.props.threads.threads[threadId].people[0];

    let newUsers = this.state.users.slice();

    newUsers.push(userId);

    this.setState({
      users: newUsers.slice(-3),
      unseenThreads: Object.assign({}, this.state.unseenThreads, {
        [threadId]: timestamp
      })
    });
  }

  _checkUnseenThread(threadId) {
    if (Object.keys(this.state.unseenThreads).indexOf(threadId) === -1) {
      this._addUnseenThread(threadId);
      return;
    }

    if (this.props.threads.threads[threadId].last_message.createdAt !== this.state.unseenThreads[threadId]) {
      this._addUnseenThread(threadId);
      return;
    }
  }
}
