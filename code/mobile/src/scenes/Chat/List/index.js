import React, { Component } from 'react';
import List from '../../../components/Chat/List';
import BlockerActivity from '../../../components/BlockerActivity';
import {setStatusBarStyle} from '../../../modules/StatusBar/actions';
import {base} from '../../../core/Api';

import { connect } from 'react-redux';

@connect(
  state => ({
    uid: state.auth.uid,
  }),
)
export default class ListContainer extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    list: [],
    isLoading: true,
  };

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }


  componentWillMount() {
console.log("hello")
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
    console.log(this.state)
    if (this.state.isLoading) return <BlockerActivity />;
    return  <List list={this.state.list} />;
  }
}
