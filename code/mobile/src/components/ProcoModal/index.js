import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';

import Button from '../Button';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

export default class ProcoModal extends Component {
  state = {
    show: false,
  };
  componentWillMount() {
    this.setState({ show: true });
  }
  componentWillUnmount() {
    this.setState({ show: false });
  }
  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.show}
      >
        {this.props.render(...this.props)}
      </Modal>
    );
  }
}

export default class ProcoModal extends Component {

  render() {
    console.log("prop", this.props)
    return null;
  }
}
