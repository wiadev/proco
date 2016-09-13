import React from 'react';
import {
  View,
  Image
} from 'react-native';

import Text from '../Text';
import Button from '../Button';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

export default class Card extends React.Component {
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
        source={require('../../assets/images/cameraPermission.png')}
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
        <View style={styles.inner}>
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
