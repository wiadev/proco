import React, { Component } from 'react';
import List from '../../../components/Chat/List';
import {setStatusBarStyle} from '../../../modules/StatusBar/actions';
import {database} from '../../../core/Api';
import {assign} from '../../../core/utils';
const getConversationListRef = (uid) => database().ref().child(`conversation-lists/${uid}`);

import { connect } from 'react-redux';

@connect(
  state => ({
    auth: state.auth,
  }),
)
export default class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.listeners = {};
  }

  state = {
    list: [],
    data: {},
  };

  componentWillUnmount() {
    Object.keys(this.listeners).forEach(key => this.listeners[key]());
  }


  componentWillMount() {

    const ref = getConversationListRef(this.props.auth.uid);

    const generateList = data => {
      let list = Object.keys(data).filter(key => {
        let item = data[key];
        if (item !== undefined) return true;
        return false;
      }).map(key => {
        let item = data[key];
        item['unread'] = Number(item['unread']);
        item['key'] = key;
        return item;
      });

      list.sort((a, b) => {
        a = a.timestamp;
        b = b.timestamp;
        if (a === b) return 0;
        if (typeof a === typeof b) return a < b ? 1 : -1;
        return typeof a < typeof b ? 1 : -1;
      });

      return list;
    };

    const addedOrChanged = async (snapshot) => {
      const key = await snapshot.key();
      const item = await snapshot.val();

      const data = assign(this.state.data, {
        [key]: item,
      });

      this.setState({data: data, list: generateList(data)});
    };

    this.listeners.added = ref.on('child_added', addedOrChanged);

    this.listeners.changed = ref.on('child_changed', addedOrChanged);

    this.listeners.removed = ref.on('child_removed',
      async (snapshot) => {
        const key = await snapshot.key();

        const data = assign(this.state.data, {
          [key]: undefined,
        });

        this.setState({data: data, list: generateList(data)});
      });

  }

  componentDidMount() {
    this.props.dispatch(setStatusBarStyle('default'));
  }

  render() {
    return  <List list={this.state.list} />;
  }
}
