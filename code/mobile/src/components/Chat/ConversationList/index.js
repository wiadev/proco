import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ListView,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Header from '../../Header';
import MessageCountIcon from '../CountIcon';
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

        {this._renderConversationList()}
      </View>
    );
  }

  _renderConversationList() {
    const listDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });

    if (this.props.list.length === 0) {
      return (
        <Card label="You have no messages" noClose={true} />
      );
    } else {
      return (
        <ScrollView>
          <ListView
            dataSource={listDataSource.cloneWithRows(this.props.list)}
            renderRow={::this._renderSingleConversation}
          />
        </ScrollView>
      );
    }
  }

  _renderSingleConversation(conversation) {
    // TODO: Other user's avatar should go in <View style={styles.avatar}></View>
    return (
      <TouchableHighlight onPress={() => this._goToConversation(conversation.cid)} underlayColor="rgba(0, 0, 0, 0.1)">
        <View style={styles.conversation}>
          <View style={styles.avatar}>

          </View>

          <View style={styles.conversationInfo}>
            <View>
              <Text style={styles.username}>{conversation.name}</Text>
              <Text style={styles.lastMessage}>{conversation['last-message']}</Text>
            </View>

            <View>
              <MessageCountIcon
                messageCount={conversation.unread}
                messageDot={{borderColor: 'white'}}
                textColor={conversation.unread ? 'rgb(249,54,95)' : 'rgb(209,213,217)'}
                textStyles={conversation.unread ? {color: 'white', fontSize: 12, left: -31} : {color: 'transparent'}}
                showEmpty={false}
                size={25}
              />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _goToConversation(cid) {
    Actions.Conversation({
      cid:cid
    });
  }
}
