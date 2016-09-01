import React, {Component} from 'react';
import {
} from 'react-native';
import {connect} from 'react-redux';
import { base } from '../../core/Api';
import { handleAuth } from './actions';
import {
  STARTED,
} from './actionTypes';

@connect()
class AuthenticationListener extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    this.ref = base.onAuth((data) => dispatch(handleAuth(data)));
  }

  componentWillUnmount() {
    this.ref();
  }

  render() {
    return null;
  }
}

export default AuthenticationListener;
