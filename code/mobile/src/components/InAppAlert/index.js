import React, { Component } from 'react';
import { AlertIOS } from 'react-native'

class InAppAlert extends Component {

  componentDidUpdate() {
    this.props.clear();
  }

  render() {
    const { show, title = null, text = null, clear } = this.props;

    if (show) {
      AlertIOS.alert(
        title,
        text
      );
    }

    return null;
  }
}

export default InAppAlert;
