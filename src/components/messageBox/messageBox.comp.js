import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  messageBox: {
    flex: 0,
    backgroundColor: '#F9365F',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginTop: 5,
    minWidth: 50,
  },
  messageBoxText: {
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: 18,
  },
  messagePrefixIcon: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  lefticon: {
    left: -15,
    top: 9,
    transform: [{
      rotateX: '180deg',
    }, {
      rotateZ: '180deg',
    }],
  },
  righticon: {
    right: -15,
    top: 9,
  },
});

class messageBoxComp extends Component {

  static propTypes = {
    text: React.PropTypes.string.isRequired,
    color: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    position: React.PropTypes.oneOf(['left', 'right']),
    style: React.PropTypes.object,
  };

  static defaultProps = {
    color: 'white',
    backgroundColor: '#F9365F',
    position: 'left',
    style: {},
  };

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  render() {
    return (
      <View style={[this.styles.messageBox, this.props.style, {
        backgroundColor: this.props.backgroundColor,
      }, this.styles[this.props.position]]}>
        <IconM
          name="reply"
          size={44}
          color={this.props.backgroundColor}
          style={[this.styles.messagePrefixIcon, this.styles[this.props.position + 'icon']]}
        />
        <Text style={[this.styles.messageBoxText, {
          color: this.props.color,
        }]}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

export default messageBoxComp;
