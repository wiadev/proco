import React, {Component} from "react";
import {connect} from "react-redux";
import {getUserRefForTypeAsString, updateUserLocally} from "./actions";
import {base, database} from '../../core/Api';

@connect()
class UserListener extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount(){
    console.log("un mount", this.props, this.state)
    if (this.ref) base.removeBinding(this.ref);
  }

  startListening({ type, uid }) {
    if (!uid) return;
    if (type === 'is') {
      const isOnlineRef = database.ref(`users/summary/${uid}/is_online`);
      isOnlineRef.set(true).then(() => isOnlineRef.onDisconnect().set(false));
    }
    if (!this.ref) {
      this.ref = base.syncState(getUserRefForTypeAsString(type, uid), {
        context: this,
        state: type,
      });
    }
  }

  componentWillMount() {
    console.log("I should run once", this.props, this.state)
    this.startListening(this.props);
  }

  componentWillReceiveProps(props) {
    this.startListening(props);
  }

  componentWillUpdate(nextProps, nextState) {
    const { type, dispatch } = nextProps;
    if (nextState[type] && nextState[type] !== this.state[type]) {
      dispatch(updateUserLocally(type, nextState[type]));
    }
  }

  render() {
    return null;
  }
}

export default UserListener;
