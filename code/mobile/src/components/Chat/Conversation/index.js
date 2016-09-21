import React from 'react';
import {
  View,
  ActionSheetIOS,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {GiftedChat} from 'react-native-gifted-chat';

import Header from '../../Header';
import styles from './styles';

const propTypes = {
  messages: React.PropTypes.array.isRequired,
  onSend: React.PropTypes.func.isRequired
};

class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.conversation}>
        <Header
          theme="light"
          leftActorType="icon"
          leftActor="keyboard-arrow-left"
          leftAction={Actions.pop}
          rightActorType="icon"
          rightActor="error-outline"
          rightAction={() => this._showUserActionSheet()}
          title={this.props.recipient.name}
        />

        <View style={styles.container}>
          <GiftedChat
            autoFocus={false}
            blurOnSubmit={false}
            displayNames={false}
            loadEarlierMessagesButton={true}
            keyboardShouldPersistTaps={true}
            placeholder={'Your message?'}
            messages={this.props.messages}
            onSend={::this.props.onSend}
            sendButtonText={'SEND'}
          />
        </View>
      </View>
    );
  }

  _showUserActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
        options: [
          'Report',
          'Block',
          'Cancel',
        ],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
          case 1:
          case 2:
          case 3:
        }
      });
  }
}

export default Conversation;
