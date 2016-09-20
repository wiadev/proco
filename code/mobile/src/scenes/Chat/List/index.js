import React from 'react';
import List from '../../../components/Chat/ConversationList';

import { connect } from 'react-redux';

@connect(state => ({threads: state.api.data.userThreads, profiles: state.profiles}))
export default class ConversationList extends React.Component {
  render() {
    return (
      <List threads={this.props.threads} profiles={this.props.profiles} />
    );
  }
}
