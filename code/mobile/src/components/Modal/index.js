import React from 'react';
import { Dimensions } from 'react-native';
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
        {this.props.children}
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
  swipeToClose: React.PropTypes.bool,
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

CustomModal.defaultProps = {
  isOpen: false,
  swipeToClose: false,
  width: 0.9,
  height: 0.6
};
