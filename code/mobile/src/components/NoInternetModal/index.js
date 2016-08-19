import React, {Component} from 'react';
import { NetInfo } from 'react-native';
import {connect} from 'react-redux';
import {setStatusBarStyle} from '../../modules/StatusBar';
import { CardModal } from '../Card';

@connect()
export default class NoInternetModal extends Component {
  constructor(props) {
    super(props);
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    this.checkConnectivity = this.checkConnectivity.bind(this);
  }

  state = {
    isConnected: true,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'change',
      this.handleConnectivityChange
    );
    this.checkConnectivity();
  }

  componentWillUnmount () {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange(isConnected) {
    this.setState({
      isConnected,
    });
  }

  checkConnectivity() {
    NetInfo.isConnected.fetch().done(
      (isConnected) => {
        this.setState({isConnected});
      }
    );
  }

  render() {
    return (
      <CardModal
        //show={!this.state.isConnected}
        show={false} // there is bug in the simulator @todo
        title="You need the Internet" text="Proco requires Internet access to function"
        buttons={[
          {
            text: "Try again",
            onPress: () => {
              this.checkConnectivity();
            }
          }
        ]}
      />
    );
  }
}
