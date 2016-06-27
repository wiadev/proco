import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  messageCount: {
    color: '#F9365F',
    left: -35,
    textAlign: 'center',
    width: 18,
    textShadowColor: 'rgba(0,0,0,0.5)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  messageIcon: {
    flex: 0,
    alignItems: 'center',
    width: 45,
  },
  messageDot: {
    color: '#F9365F',
    left: -37,
    top: -8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
});

class MessageCountIconComp extends Component {

  static propTypes = {
    onClick: React.PropTypes.func,
    messageCount: React.PropTypes.number,
  };

  static defaultProps = {
    onClick: () => {}
  };

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  render() {
    return (
      <Icon.Button
        color={'white'}
        name="comment"
        backgroundColor="transparent"
        style={this.styles.messageIcon}
        size={32}
        onClick={this.props.onClick}
      >
        <Text style={this.styles.messageCount}>
          {this.props.messageCount}
        </Text>
        <Icon
          name="circle"
          size={12}
          color="#FFFFFF"
          style={this.styles.messageDot}
        />
      </Icon.Button>
    );
  }
}

export default MessageCountIconComp;
