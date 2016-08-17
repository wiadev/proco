import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
const photo = require('../../assets/images/cameraPermission.png');
class Card extends Component {

  constructor(props) {
    super(props);
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
    const { icon, title, text, buttons, renderThis } = this.props;
    return (
      <View style={styles.preview}>
        <Image
          style={styles.backgroundImage}
          source={photo}
        />
        <LinearGradient
          colors={['rgba(59, 28, 255, 0.8)', 'rgba(249, 54, 95, 0.8)']}
          style={styles.preview}
        >
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
        </LinearGradient>
      </View>
    );
  }
}

export default Card;
