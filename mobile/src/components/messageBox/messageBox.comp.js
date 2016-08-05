import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  messageBox: {
    marginLeft: 20,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  right: {
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 20,
  },
  chatScreenBox: {
    marginLeft: 0,
    marginRight: 0,
  },
  chatScreenrightBox: {
    backgroundColor: 'rgb(86,54,234)',
  },
  chatScreenrightBoxIcon: {
    backgroundColor: 'rgb(86,54,234)',
  },
  messageBoxText: {
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: 18,
    backgroundColor: '#F9365F',
    flex: -1,
    alignSelf: 'flex-start',
    minHeight: 5,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 20,
    paddingRight: 20,
    overflow: 'hidden',
    maxWidth: width * 80 / 100,
  },
  messageBoxArea: {
    backgroundColor: '#F9365F',
    flex: 1,
    alignSelf: 'flex-start',
    minHeight: 5,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 20,
    paddingRight: 20,
    overflow: 'hidden',
    maxWidth: width * 80 / 100,
  },
  reach: {
    flex: 1,
  },
  messagePrefixIcon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: -5,
  },
  lefticon: {
    left: -15,
    transform: [{
      rotateX: '180deg',
    }, {
      rotateZ: '180deg',
    }],
  },
  righticon: {
    right: -15,
  },
});

class messageBoxComp extends Component {

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
    backgroundColor: '#F9365F',
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
      color = 'rgb(86,54,234)';
    }

    return (
      <View style={[
        this.styles.messageBox,
        this.props.style,
        this.styles[this.props.position],
        this.styles[this.props.type + 'Box'],
      ]}>
        <IconM
          name="reply"
          size={44}
          color={color}
          style={[
            this.styles.messagePrefixIcon,
            this.styles[this.props.position + 'icon'],
          ]}
        />
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
          this.styles[this.props.type + this.props.position + 'Box']]}>
            {this.props.text}
          </Text>
        )}
      </View>
    );
  }
}

export default messageBoxComp;
