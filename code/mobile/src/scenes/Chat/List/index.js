import React from 'react';
import List from '../../../components/Chat/ConversationList';
import {database} from '../../../core/Api';

import { connect } from 'react-redux';

@connect(
  state => ({
    uid: state.auth.uid,
  }),
)
export default class ConversationList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      isLoading: true
    };
  }

  componentWillUnmount() {
  }

  componentWillMount() {

    database.ref(`inboxes/${this.props.uid}`).on('value', (snap) => {
      const data = snap.val();
      this.setState({threads: data.threads});
    });

  }

  render() {
    return (
      <List isLoading={this.state.isLoading} list={this.state.threads} />
    );
  }
}
