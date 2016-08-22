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
export default class Card extends Component {

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
    console.log("propscard", this.props);

    const {icon, label, text, renderThis, noClose = false} = this.props;
    let { buttons = [] } = this.props;

    if (noClose === false) {
      buttons = buttons.concat([{
        text: "Close",
        onPress: Actions.pop
      }]);
    }

    return (
      <View style={styles.container}>
        <View style={styles.innner}>
          {this.renderIcon(icon)}

          {label && <Text style={styles.label}>{label}</Text>}
          {text && <Text style={styles.text}>{text}</Text>}

          {renderThis && renderThis()}
          {buttons && <View style={styles.buttonList}>{this.renderButtons(buttons)}</View>}

        </View>
      </View>
    );
  }
}
