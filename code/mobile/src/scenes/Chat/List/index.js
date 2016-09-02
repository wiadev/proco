import React from 'react';
import List from '../../../components/Chat/ConversationList';
import BlockerActivity from '../../../components/BlockerActivity';
import {setStatusBarStyle} from '../../../modules/StatusBar/actions';
import {base, getUserSummary} from '../../../core/Api';

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
    base.removeBinding(this.ref);
  }

  componentWillMount() {
      this.ref = base.syncState(`users/conversation-lists/${this.props.uid}`, {
        context: this,
        state: 'list',
        asArray: true,
        then: () => this.setState({isLoading: false})
      });
  }

  componentDidMount() {
    this.props.dispatch(setStatusBarStyle('default'));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <BlockerActivity />
      );
    }

    return (
      <List list={this.state.list} />
    );
  }
}
