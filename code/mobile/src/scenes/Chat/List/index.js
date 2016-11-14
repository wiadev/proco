import React from "react";
import { connect } from "react-redux";
import { View, StatusBar } from "react-native";
import List from "../../../components/Chat/ConversationList";
import { openThread } from "../../../modules/chat/actions";
import styles from "./styles";

@connect(
  state => ({
    threads: state.chat.threads,
    profiles: state.profiles,
  }),
  dispatch => ({
    threadOpener: (thread_id) => dispatch(openThread(thread_id)),
  }),
)
export default class ConversationList extends React.Component {
  render() {
    return (
      <View style={styles.conversationList}>
        <StatusBar hidden={false} barStyle="dark-content"/>
        <List
          threads={this.props.threads}
          profiles={this.props.profiles}
          threadOpener={this.props.threadOpener}
        />
      </View>
    );
  }
}
