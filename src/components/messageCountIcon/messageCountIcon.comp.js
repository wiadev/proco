import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

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
    onPress: React.PropTypes.func,
    messageCount: React.PropTypes.number,
    textColor: React.PropTypes.string,
    showEmpty: React.PropTypes.bool,
    styles: React.PropTypes.object,
    textStyles: React.PropTypes.object,
    size: React.PropTypes.number,
  };

  static defaultProps = {
    onPress: () => {
      Actions.messagesListScreen();
    },
    textColor: 'white',
    size: 32,
    showEmpty: true,
    styles: {},
    textStyles: {},
  };

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  render() {
    let messageCount = this.props.messageCount;
    if (!this.props.showEmpty && this.props.messageCount <= 0) messageCount = '';

    return (
      <Icon.Button
        color={this.props.textColor}
        name="comment"
        backgroundColor="transparent"
        style={[this.styles.messageIcon, this.props.styles]}
        size={this.props.size}
        onPress={this.props.onPress}
        pointerEvents={'box-only'}
      >
        <Text style={[this.styles.messageCount, this.props.textStyles]}>
          {messageCount}
        </Text>
        {
          this.props.messageCount <= 0 ? null : (
            <Icon
              name="circle"
              size={12}
              color={this.props.textColor}
              style={this.styles.messageDot}
            />
          )
        }
      </Icon.Button>
    );
  }
}

export default MessageCountIconComp;
