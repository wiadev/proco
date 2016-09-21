import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

@connect(state => ({unseenThreadsCount: state.api.data.userThreads.unseen.length}))
export default class MessageCountIcon extends React.Component {
  render() {
    console.log(this.props);
    return (
      <TouchableOpacity onPress={Actions.ConversationList} activeOpacity={0.6} style={styles.messageCountIcon}>
        <Icon name="comment" style={styles.icon} />

        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Text style={styles.messagesCount}>{this._renderUnreadMessageCount()}</Text>
          </View>
        </View>

        {this._renderUnreadIndicator()}
      </TouchableOpacity>
    );
  }

  _renderUnreadMessageCount() {
    if (this.props.unseenThreadsCount > 99) {
      return '99+';
    } else {
      return this.props.unseenThreadsCount;
    }
  }

  _renderUnreadIndicator() {
    if (this.props.unseenThreadsCount !== 0) {
      return (
        <View style={styles.unreadIndicator}>
          <View style={styles.unreadIndicatorInner} />
        </View>
      );
    }
  }
}
