import React from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  ListView,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Header from '../../Header';
import MessageCountIcon from '../MessageCountIcon';
import Card from '../../Card';
import styles from './styles';

export default class ConversationList extends React.Component {
  render() {
    return (
      <View style={styles.conversationList}>
        <Header
          theme="light"
          title="Messages"
          leftActorType="icon"
          leftActor="keyboard-arrow-left"
          leftAction={() => Actions.pop()}
        />

        {this.props.isLoading ? <ActivityIndicator
          size="large"
          color="#ffffff"
        /> : this._renderConversationList()}
      </View>
    );
  }

  _renderConversationList() {
    if (Object.keys(this.props.threads.threads).length === 0) {
      return (
        <Card label="You have no messages" noClose={true} />
      );
    }

    const listDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });

    let threadsArray = [];

    Object.keys(this.props.threads.threads).map(threadId => threadsArray.push({
      threadId: threadId,
      ...this.props.threads.threads[threadId]
    }));

    return (
      <ScrollView>
        <ListView
          dataSource={listDataSource.cloneWithRows(threadsArray)}
          renderRow={::this._renderSingleConversation}
        />
      </ScrollView>
    );
  }

  _renderSingleConversation(thread) {
    // TODO: Other user's avatar should go in <View style={styles.avatar}></View>
    const profile = this.props.profiles.profiles[thread.people[0]];

    return (
      <TouchableHighlight onPress={() => Actions.Conversation(thread.threadId)} underlayColor="rgba(0, 0, 0, 0.1)">
        <View style={styles.conversation}>
          <View style={styles.avatar}>
            <Image source={{uri: profile.avatar}} style={{flex: 1, width: null, height: null, resizeMode: 'cover'}} />
          </View>

          <View style={styles.conversationInfo}>
            <View>
              <Text style={styles.username}>{this.props.profiles.profiles[thread.people[0]].name}</Text>
              <Text style={styles.lastMessage}>{thread.last_message.text}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

ConversationList.propTypes = {
  threads: React.PropTypes.any.isRequired,
  profiles: React.PropTypes.any.isRequired
};
