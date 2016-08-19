import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';

import Button from '../Button';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
const photo = require('../../assets/images/cameraPermission.png');
export class Card extends Component {

  constructor(props) {
    super(props);
  }

  renderButtons(buttons = []) {
    return buttons.map((button, i) => {
      return (
        <Button key={i} text={button.text} onPress={button.onPress} />
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
    const {icon, head, text, buttons, renderThis} = this.props;

    return (
        <View style={styles.container}>
          <View style={styles.permissionArea}>
            {this.renderIcon(icon)}

            {head ? <Text style={styles.permissionLabel}>
              {head}
            </Text> : null}

            {text ? <Text style={styles.permissionText}>
              {text}
            </Text> : null}

            {renderThis ? renderThis() : null}
            {buttons ? <View style={styles.buttonList}>{this.renderButtons(buttons)}</View> : null}

          </View>
        </View>
    );
  }
}
export class CardModal extends Component {
  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.show}
        onRequestClose={() => {
          console.log("Modal has been closed.")
        }}
      >
        <Card {...this.props} />
      </Modal>
    );
  }
}

export default Card;
