import React, { Component } from 'react';
import DropdownAlert from 'react-native-dropdownalert'

class InAppAlert extends Component {

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  showAlert(type, title, message) {
    this.refs.dropdown.alert(type, title, message)
  }

  render() {
    return (
      <DropdownAlert ref={'dropdown'}
                     imageUri={'https://facebook.github.io/react/img/logo_og.png'}
      />
    );
  }
}

export default InAppAlert;
