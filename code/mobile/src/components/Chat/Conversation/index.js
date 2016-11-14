import React, { Component } from "react";
import { View, TouchableOpacity, ActionSheetIOS } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { GiftedChat } from "react-native-gifted-chat";
import Header from "../../Header";
import Bubble from "../../Bubble";
import styles from "./styles";

export default class Conversation extends Component {
  render() {
    return (
      <View style={styles.conversation}>
        <Header
          theme="light"
          leftActorType="icon"
          leftActor="ios-arrow-back"
          leftAction={this.props.close}
          rightActorType="icon"
          rightActor="ios-alert-outline"
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
            user={this.props.user}
            onSend={::this.props.onSend}
            renderBubble={::this._renderBubble}
            renderSend={::this._renderSend}
          />
        </View>
      </View>
    );
  }

  _renderBubble(chatProps) {
    return (
      <View style={{flex: 1}}>
        <Bubble
          type="text"
          position={chatProps.position}
          noTail={chatProps.isSameUser(chatProps.currentMessage, chatProps.nextMessage) && chatProps.isSameDay(chatProps.currentMessage, chatProps.nextMessage)}
          text={chatProps.currentMessage.text}
          multiline={true}
        />
      </View>
    );
  }

  _renderSend(chatProps) {
    return (
      <TouchableOpacity
        onPress={() => chatProps.onSend({text: chatProps.text.trim()}, true)}
        style={styles.send}>
        <Icon name="ios-send" style={styles.sendIcon}/>
      </TouchableOpacity>
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

Conversation.propTypes = {
  messages: React.PropTypes.array.isRequired,
  onSend: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
};
