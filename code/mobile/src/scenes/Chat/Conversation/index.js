import React, {Component} from "react";
import { connect } from "react-redux";
import Conversation from "../../../components/Chat/Conversation";
import { report, block } from "../../../modules/profiles/actions";
import {
  send,
  loadMessages,
closeThread,
} from "../../../modules/chat/actions";

@connect(
  (state, ownProps) => {
    const thread = state.chat.threads[ownProps.thread_id];
    return {
      thread,
      messages: state.chat.messages[ownProps.thread_id],
      recipient: state.profiles.profiles[thread.people[0]],
      user: {
        _id: state.auth.get('uid'),
      },
    };
  },
  (dispatch, ownProps) => ({
    send: (message) => dispatch(send(ownProps.thread_id, message)),
    loadMessages: (endAt) => dispatch(loadMessages(ownProps.thread_id, endAt)),
    report: (uid) => dispatch(report(uid, {
      from: 'chat',
      thread_id: ownProps.thread_id,
    })),
    block: (uid) => dispatch(block(uid, {
      from: 'chat',
      thread_id: ownProps.thread_id,
    })),
    close: () => dispatch(closeThread(ownProps.thread_id)),
  }),
  (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, dispatchProps, {
    loadEarlier: () => dispatchProps.loadMessages(stateProps.messages[stateProps.messages.length - 1].createdAt),
    report: () => dispatchProps.report(stateProps.recipient._id),
    block: () => dispatchProps.block(stateProps.recipient._id),
  }),
)
export default class ConversationContainer extends Component {

  render() {
    return (<Conversation
      onSend={::this.onSend}
      user={this.props.user}
      messages={this.props.messages}
      thread={this.props.thread}
      recipient={this.props.recipient}
      close={this.props.close}
    />);
  }

  onSend(messages) {
    messages.forEach(message => this.props.send(message));
  }
}
