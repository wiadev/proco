import React from 'react';
import {
  View,
  Image
} from 'react-native';
import Text from '../Text';
import Button from '../Button';

import styles from './styles';

export default class MatchNotification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0
    };
  }

  render() {
    // TODO: Set onPress props of buttons.
    return (
      <View style={styles.matchNotification} onLayout={event => this._onLayout(event)}>
        <View style={styles.container}>
          <Text style={[styles.text, styles.title]}>New match!</Text>

          <View style={styles.avatarContainer}>
            <Image source={{uri: 'http://images.indianexpress.com/2015/03/emma-watson759.jpg'}} style={{
              width: this.state.width / 2,
              height: this.state.width / 2,
              borderRadius: this.state.width / 4
            }} />
          </View>

          <Text style={styles.text}>You and Emma matched!</Text>

          <View style={styles.buttons}>
            <Button text="Send message" onPress={() => console.log("Send message")} />

            <Button text="Keep playing" onPress={() => console.log("Keep playing")} />
          </View>
        </View>
      </View>
    );
  }

  _onLayout(event) {
    this.setState({
      width: event.nativeEvent.layout.width
    });
  }
}
