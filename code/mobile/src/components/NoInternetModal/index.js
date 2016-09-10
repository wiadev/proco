import React, {Component} from 'react';
import { NetInfo, Modal } from 'react-native';
import {connect} from 'react-redux';
import Card  from '../Card';

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
      <Modal
        animationType={"slide"}
        transparent={false}
        //visible={!this.state.isConnected}
        visible={false} // there is bug in the simulator @todo
      >
      <Card
        label="You need the Internet" text="Proco requires Internet access to function"
        buttons={[
          {
            text: "Try again",
            onPress: () => {
              this.checkConnectivity();
            }
          }
        ]}
      />
        </Modal>
    );
  }
}
