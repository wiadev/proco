import React from "react";
import { connect } from "react-redux";
import Conversation from "../../../components/Chat/Conversation";
import { report, block } from "../../../modules/Profiles/actions";
import {
  post,
  startWatchingThread,
  stopWatchingThread,
  loadMessages,
  markThreadAsSeen,
} from "../../../modules/Chat/actions";

@connect(
  (state, ownProps) => {
    const thread = Object.assign({
      id: ownProps.data,
    }, state.api.data.userThreads.threads[ownProps.data]);

    return {
      thread,
      messages: state.chat.messages[ownProps.data],
      recipient: state.profiles.profiles[thread.people[0]],
      user: {
        _id: state.auth.uid,
      },
    };
  },
  (dispatch, ownProps) => ({
    post: (message) => dispatch(post(ownProps.data, message)),
    startWatching: () => dispatch(startWatchingThread(ownProps.data)),
    stopWatching: () => dispatch(stopWatchingThread(ownProps.data)),
    loadMessages: (endAt) => dispatch(loadMessages(ownProps.data, endAt)),
    markThreadAsSeen: () => dispatch(markThreadAsSeen(ownProps.data)),
    report: (uid) => dispatch(report(uid, {
      from: 'chat',
      thread_id: ownProps.data,
    })),
    block: (uid) => dispatch(block(uid, {
      from: 'chat',
      thread_id: ownProps.data,
    })),
  }),
  (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, dispatchProps, {
    loadEarlier: () => dispatchProps.loadMessages(stateProps.messages[stateProps.messages.length - 1].createdAt),
    report: () => dispatchProps.report(stateProps.recipient._id),
    block: () => dispatchProps.block(stateProps.recipient._id),
  }),
)
export default class ConversationContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.startWatching();
    this.props.markThreadAsSeen();
  }

  componentWillUnmount() {
    this.props.stopWatching();
  }

  componentWillReceiveProps() {
    this.props.markThreadAsSeen();
  }

  render() {
    console.log(this.props);
    return (<Conversation
      onSend={::this.onSend}
      user={this.props.user}
      messages={this.props.messages}
      thread={this.props.thread}
      recipient={this.props.recipient}
    />);
  }

  onSend(messages) {

    messages.forEach(message => this.props.post(message));
    console.log(messages);
  }
}
