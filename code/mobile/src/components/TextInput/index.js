import React from 'react';
import { TextInput } from 'react-native';

export default class CustomTextInput extends React.Component {
  render() {
    return (
      <TextInput {...this.props} />
    );
  }
}

CustomTextInput.propTypes = {
  autoFocus: React.PropTypes.bool,
  style: React.PropTypes.any
};
