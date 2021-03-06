import React from 'react';
import {
  View,
  TextInput
} from 'react-native';

import Text from '../Text';
import styles from './styles';

const types = ['text', 'input'];
const positions = ['left', 'right'];

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textInputHeight: 20
    };
  }

  render() {
    return (
      <View style={this.props.style}>
        {this._renderContent()}
      </View>
    );
  }

  _renderContent() {
    if (this.props.type === 'text') {
      return (
        <View style={this._getContainerStyle()}>
          <Text chatText={true} style={this._getTextStyle()}>{this.props.text}</Text>

          {this._renderTail()}
        </View>
      );
    } else {
      return (
        <View style={this._getContainerStyle()}>
          <Text numberOfLines={1} style={[styles.content, styles.sizeHandlerText]}>{this.props.value}</Text>

          {this._renderTail()}

          <TextInput
            ref="textInput"
            value={this.props.value}
            autoFocus={this.props.autoFocus}
            multiline={this.props.multiline}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            onChangeText={this.props.onChange}
            onSubmitEditing={this.props.onSubmitEditing}
            onContentSizeChange={event => this._onContentSizeChange(event)}
            style={this._getTextInputStyle()}
          />
        </View>
      );
    }
  }

  _renderTail() {
    if (!this.props.noTail) {
      return (
        <View style={this._getTailStyle()} />
      );
    }
  }

  focus() {
    if (this.refs.hasOwnProperty('textInput')) {
      this.refs.textInput.focus();
    }
  }

  // common methods
  _getContainerStyle() {
    let containerStyle = [styles.container];

    switch (this.props.position) {
      case 'left':
        containerStyle.push(styles.containerLeft);
        break;
      case 'right':
        containerStyle.push(styles.containerRight);
        break;
    }

    if (this.props.alternativeStyle) {
      containerStyle.push(styles.containerAlt);
    }

    if (this.props.type === 'input' && this.props.multiline) {
      containerStyle.push(styles.containerForMultilineInput);
    }

    return containerStyle;
  }

  _getTailStyle() {
    let tailStyle = [styles.tail];

    switch (this.props.position) {
      case 'left':
        tailStyle.push(styles.tailLeft);
        break;
      case 'right':
        tailStyle.push(styles.tailRight);
        break;
    }

    if (this.props.alternativeStyle) {
      tailStyle.push(styles.tailAlt);
    }

    return tailStyle;
  }

  // text methods
  _getTextStyle() {
    let textStyle = [styles.content];

    switch (this.props.position) {
      case 'left':
        textStyle.push(styles.contentLeft);
        break;
      case 'right':
        textStyle.push(styles.contentRight);
        break;
    }

    if (this.props.alternativeStyle) {
      textStyle.push(styles.contentAlt);
    }

    return textStyle;
  }

  // input methods
  _onContentSizeChange(event) {
    if (this.props.multiline) {
      this.setState({
        textInputHeight: event.nativeEvent.contentSize.height
      });
    }
  }

  _getTextInputStyle() {
    let textInputStyle = [styles.content, styles.textInput, {height: this.state.textInputHeight}];

    if (this.props.multiline) {
      textInputStyle.push(styles.textInputMultiLine);
    }

    switch (this.props.position) {
      case 'left':
        textInputStyle.push(styles.contentLeft);
        break;
      case 'right':
        textInputStyle.push(styles.contentRight);
        break;
    }

    if (this.props.alternativeStyle) {
      textInputStyle.push(styles.contentAlt);
    }

    return textInputStyle;
  }
}

Bubble.propTypes = {
  type: React.PropTypes.oneOf(types),
  position: React.PropTypes.oneOf(positions).isRequired,
  alternativeStyle: React.PropTypes.bool,
  noTail: React.PropTypes.bool,
  style: React.PropTypes.any,

  // text
  text: React.PropTypes.string,

  // input
  autoFocus: React.PropTypes.bool,
  multiline: React.PropTypes.bool,
  returnKeyType: React.PropTypes.string,
  value: React.PropTypes.string,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onSubmitEditing: React.PropTypes.func
};

Bubble.defaultProps = {
  alternativeStyle: false,
  noTail: false,
  autoFocus: false,
  multiline: false,
  returnKeyType: 'next'
};
