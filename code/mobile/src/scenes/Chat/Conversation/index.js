import React from "react";
import { connect } from "react-redux";
import Conversation from "../../../components/Chat/Conversation";
import { post, startWatchingThread, stopWatchingThread, loadEarlier } from "../../../modules/Chat/actions";

@connect(
  (state, ownProps) => {
    const thread = Object.assign({
      id: ownProps.data,
    }, state.api.data.userThreads.threads[ownProps.data]);

    return {
      thread,
      messages: state.chat.messages[ownProps.data],
      recipient: state.profiles.profiles[thread.people[0]]
    };
  },
  (dispatch, ownProps) => ({
    post: (message) => dispatch(post(ownProps.data, message)),
    startWatching: () => dispatch(startWatchingThread(ownProps.data)),
    stopWatching: () => dispatch(stopWatchingThread(ownProps.data)),
    loadEarlier: (count = 30) => dispatch(loadEarlier(ownProps.data, count)),
  }),
)
export default class ConversationContainer extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  componentWillMount() {
    this.props.startWatching();
  }

  componentWillUnmount() {
    this.props.stopWatching();
  }

  componentDidMount() {

  }

  render() {
    console.log(this.props);
    return (<Conversation
      onSend={::this.onSend}
      messages={this.props.messages}
      thread={this.props.thread}
      recipient={this.props.recipient}
    />);
  }

  onSend(messages) {

console.log(messages);
  }
}
