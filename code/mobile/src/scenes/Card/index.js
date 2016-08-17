import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';

const {BlurView, VibrancyView} = require('react-native-blur');

import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
const photo = require('../../assets/images/cameraPermission.png');
class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    this.setState({modalVisible: true})
  }

  componentWillUnmount() {
    this.setState({modalVisible: false})
  }

  renderButtons(buttons = []) {
    return buttons.map((button, i) => {
      return (
        <View key={i} style={styles.button} pointerEvents={'box-none'}>
          <Text style={styles.buttonText} onPress={button.onPress}>
            {button.text}
          </Text>
        </View>
      );
    });
  }

  renderIcon(icon) {
    if (!icon) return null;
    return (
      <Image
        style={styles.permissionImage}
        source={photo}
      />
    );
  }

  render() {
    const {icon, title, text, buttons, renderThis} = this.props;
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.")
        }}
      >
        <View style={styles.preview}>
          <View style={styles.permissionArea}>
            {this.renderIcon(icon)}

            {title ? <Text style={styles.permissionLabel}>
              {title}
            </Text> : null}

            {text ? <Text style={styles.permissionText}>
              {text}
            </Text> : null}

            {renderThis ? renderThis() : null}

            {this.renderButtons(buttons)}
          </View>
        </View>
      </Modal>
    );
  }
}

export default Card;
