import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { primary1 } from '../../../core/style/colors';

const width = Dimensions.get('window').width;

class MessageBox extends Component {

  static propTypes = {
    text: React.PropTypes.string,
    children: React.PropTypes.any,
    color: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    position: React.PropTypes.oneOf(['left', 'right']),
    style: React.PropTypes.object,
    type: React.PropTypes.string,
  };

  static defaultProps = {
    color: 'white',
    backgroundColor: '#7837Af',
    position: 'left',
    style: {},
    type: 'default',
  };

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  render() {
    let messageCount = 'notReach';
    if (this.props.text && this.props.text.length > 25) {
      messageCount = 'reach';
    } else if (!this.props.text) {
      messageCount = 'reach';
    }

    let color = this.props.backgroundColor;
    if (this.props.type === 'chatScreen' && this.props.position === 'right') {
      color = 'white';
    }

    const viewStyle = {
      opacity: 0.8,
    };
    let boxStyle = {};
    if (this.props.position === 'right') {

      boxStyle = {
        backgroundColor: 'white',
        color: '#7837Af'
      };
    }

    return (
      <View style={[
        this.styles.messageBox,
        this.props.style,
        this.styles[this.props.position],
        this.styles[this.props.type + 'Box'],
        viewStyle
      ]}>

        { (this.props.children) ? (
          <View style={[this.styles.messageBoxArea, {
            backgroundColor: this.props.backgroundColor,
          }, this.styles[messageCount]]}>
            {this.props.children}
          </View>
        ) : (
          <Text style={[this.styles.messageBoxText, {
            color: this.props.color,
          }, {
            backgroundColor: this.props.backgroundColor,
          }, this.styles[messageCount],
          this.styles[this.props.type + this.props.position + 'Box'], boxStyle]}>
            {this.props.text}
          </Text>
        )}
      </View>
    );
  }
}

export default MessageBox;
