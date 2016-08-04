import React, { Component } from 'react';
import DropdownAlert from 'react-native-dropdownalert'

class InAppAlert extends Component {

  componentDidMount() {
    this.showAlert();
  }

  componentWillReceiveProps(props) {
    this.showAlert(props);
  }

  showAlert(props = this.props) {
    const { show, type, title, message } = props;
    if (show) this.refs.dropdown.alert(type, title, message);
  }

  render() {
    const { show, closeInterval, imageUri = 'https://facebook.github.io/react/img/logo_og.png'} = this.props;
    if (!show) {
      return null;
    }

    return (
      <DropdownAlert ref={'dropdown'}
                     imageUri={imageUri}
                     closeInterval={closeInterval}
      />
    );
  }
}

export default InAppAlert;
