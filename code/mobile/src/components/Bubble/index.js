import React from 'react';
import {
  View,
  TextInput
} from 'react-native';

import Text from '../Text';
import styles from './styles';

const types = ['text', 'input'];
const contentSizes = ['small', 'regular', 'big'];
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
          <Text chatText={true} style={this._getContentStyle()}>{this.props.text}</Text>

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
            style={[this._getContentStyle(), this._getTextInputStyle()]}
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

  _getContentStyle() {
    let contentStyle = [styles.content];

    switch (this.props.position) {
      case 'left':
        contentStyle.push(styles.contentLeft);
        break;
      case 'right':
        contentStyle.push(styles.contentRight);
        break;
    }

    switch (this.props.contentSize) {
      case 'small':
        contentStyle.push(styles.contentSmall);
        break;
      case 'big':
        contentStyle.push(styles.contentBig);
        break;
    }

    if (this.props.alternativeStyle) {
      contentStyle.push(styles.contentAlt);
    }

    return contentStyle;
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
    let textInputStyle = [styles.textInput, {height: this.state.textInputHeight}];

    if (this.props.multiline) {
      textInputStyle.push(styles.textInputMultiLine);
    }

    return textInputStyle;
  }
}

Bubble.propTypes = {
  type: React.PropTypes.oneOf(types),
  position: React.PropTypes.oneOf(positions).isRequired,
  alternativeStyle: React.PropTypes.bool,
  noTail: React.PropTypes.bool,
  contentSize: React.PropTypes.oneOf(contentSizes),
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
  contentSize: contentSizes[1],
  autoFocus: false,
  multiline: false,
  returnKeyType: 'next'
};
