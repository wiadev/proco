import React from 'react';
import { View, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';
import { BlurView } from 'react-native-blur';

import styles from './styles';

const screenSize = Dimensions.get('window');

export default class CustomModal extends React.Component {
  constructor(props) {
    super(props);

    this.backdropContent = (
      <BlurView blurType="dark" style={styles.backdropContent} />
    );
  }

  render() {
    return (
      <Modal
        ref="modal"
        isOpen={this.props.isOpen}
        backdropPressToClose={this.props.backdropPressToClose}
        swipeToClose={this.props.swipeToClose}
        entry="top"
        animationDuration={300}
        backdropColor="transparent"
        backdropContent={this.backdropContent}
        style={[styles.customModal, {
          width: screenSize.width * this.props.width,
          height: screenSize.height * this.props.height
        }]}
      >
        <View style={styles.content}>
          {this.props.children}
        </View>
      </Modal>
    );
  }

  open() {
    if (this.refs.hasOwnProperty('modal')) {
      this.refs.modal.open();
    }
  }

  close() {
    if (this.refs.hasOwnProperty('modal')) {
      this.refs.modal.close();
    }
  }
}

CustomModal.propTypes = {
  isOpen: React.PropTypes.bool,
  backdropPressToClose: React.PropTypes.bool,
  swipeToClose: React.PropTypes.bool,
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

CustomModal.defaultProps = {
  isOpen: false,
  backdropPressToClose: true,
  swipeToClose: false,
  width: 0.9,
  height: 0.6
};
