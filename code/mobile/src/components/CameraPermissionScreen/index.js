import React, {Component} from 'react';
import { NetInfo } from 'react-native';
import {connect} from 'react-redux';
import {setStatusBarStyle} from '../../modules/StatusBar';
import { CardModal } from '../Card';

@connect()
export default class NoInternetModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isConnected: true,
  };

  componentDidMount() {

  }

  componentWillUnmount () {

  }

  render() {
    return (
      <CardModal
        show={true}
        title="We need yoru location"
        text="Proco requires your location access to function"
        buttons={[
          {
            text: "Yes, go ahead",
            onPress: () => {

            }
          }
        ]}
      />
    );
  }
}
