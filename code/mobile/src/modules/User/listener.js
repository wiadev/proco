import React, {Component} from "react";
import {connect} from "react-redux";
import {getUserRefForTypeAsString, updateUserLocally} from "./actions";
import {base} from '../../core/Api';

@connect()
class UserListener extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  componentWillMount() {
    const { type, uid, dispatch  } = this.props;
    this.ref = base.syncState(getUserRefForTypeAsString(type, uid), {
      context: this,
      state: type,
    });
  }

  componentWillUpdate(nextProps, nextState) {
    const { type, dispatch } = nextProps;
    dispatch(updateUserLocally(type, nextState[type]));
  }

  render() {
    return null;
  }
}

export default UserListener;
