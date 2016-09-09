import React, {Component} from 'react';
import {
} from 'react-native';
import {connect} from 'react-redux';
import { auth } from '../../core/Api';
import { handleAuth } from './actions';

@connect()
class AuthenticationListener extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    this.ref = auth.onAuthStateChanged((data) => dispatch(handleAuth(data)));
  }

  componentWillUnmount() {
    this.ref();
  }

  render() {
    return null;
  }
}

export default AuthenticationListener;
