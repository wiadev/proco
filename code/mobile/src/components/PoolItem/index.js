import React from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight,
  KeyboardAvoidingView,
  ActionSheetIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

import ProfileImageSequence from '../ProfileImageSequence';
import MessageBox from '../Chat/Box';

import styles from './styles';
import colors from '../../core/style/colors';

export default class PoolItem extends React.Component {
  static propTypes = {
    isMounted: React.PropTypes.bool.isRequired,
    sequenceImages: React.PropTypes.array.isRequired,
    messages: React.PropTypes.array.isRequired,
    onComplete: React.PropTypes.func.isRequired,
  };

  // TODO: Should be deleted when real data is present.
  static defaultProps = {
    // mock data
    isMounted: false,
    sequenceImages: [
      'https://files.icoz.co/uploads/procolooptest01.jpg',
      'https://files.icoz.co/uploads/procolooptest02.jpg',
      'https://files.icoz.co/uploads/procolooptest03.jpg',
      'https://files.icoz.co/uploads/procolooptest04.jpg',
      'https://files.icoz.co/uploads/procolooptest05.jpg',
      'https://files.icoz.co/uploads/procolooptest06.jpg',
      'https://files.icoz.co/uploads/procolooptest07.jpg',
      'https://files.icoz.co/uploads/procolooptest08.jpg',
      'https://files.icoz.co/uploads/procolooptest09.jpg',
      'https://files.icoz.co/uploads/procolooptest10.jpg',
      'https://files.icoz.co/uploads/procolooptest11.jpg',
      'https://files.icoz.co/uploads/procolooptest12.jpg',
      'https://files.icoz.co/uploads/procolooptest13.jpg',
      'https://files.icoz.co/uploads/procolooptest14.jpg',
      'https://files.icoz.co/uploads/procolooptest15.jpg',
      'https://files.icoz.co/uploads/procolooptest16.jpg',
      'https://files.icoz.co/uploads/procolooptest17.jpg',
      'https://files.icoz.co/uploads/procolooptest18.jpg'
    ],
    messages: [
      {
        text: "En sevdiğin Pokémon?"
      },
      {
        text: "Gengar"
      }
    ],
    onComplete: (eventType, params) => {
      // eventType: ['ANSWER' | 'START-CONVERSATION' | 'BLOCK' | 'REPORT']
      console.log(eventType, params);
    }
  };

  constructor() {
    super();

    this.state = {
      height: 0,
      imageSequenceRunning: false,
      imageSequenceAction: 'increase', // ['increase', 'decrease']
      imageSequenceCurrentFrame: 0,
      action: 'answer',
      answerInputVisible: false,
      answer: ""
    };
  }

  componentDidMount() {
    if (this.props.messages.length > 1) {
      this.setState({
        action: 'start-conversation'
      });
    }
  }

  render() {
    return (
      <View style={styles.poolItem} onLayout={event => this._onPoolItemLayout(event)}>
        <ProfileImageSequence isMounted={this.props.isMounted} images={this.props.sequenceImages}>
          <KeyboardAvoidingView behavior="position">
            <View style={[styles.poolItemContent, {height: this.state.height}]}>
              {this._renderMessages()}

              {this._renderAnswer()}

              {this._renderBottomButtons()}
            </View>

            <TextInput
              ref='answerInput'
              placeholder="Answer"
              returnKeyType="send"
              onSubmitEditing={() => this.props.onComplete('ANSWER', {
                text: this.state.answer
              })}
              onChangeText={text => this.setState({
                answer: text
              })}
              value={this.state.text}
              editable={true}
            />
          </KeyboardAvoidingView>
        </ProfileImageSequence>
      </View>
    );
  }

  _renderMessages() {
    if (this.props.messages.length === 1) {
      return (
        <MessageBox text={this.props.messages[0].text} position="left" />
      );
    } else {
      return this.props.messages.map((message, key) => {
        return (
          <MessageBox key={key} text={message.text} position={key % 2 === 0 ? 'right' : 'left'} />
        );
      });
    }
  }

  _renderBottomButtons() {
    return (
      <View style={styles.bottomButtons}>
        <TouchableHighlight onPress={() => this._showReportMenu()} activeOpacity={0.9} underlayColor={colors.primaryAlt} style={styles.bottomButton}>
          <Icon
            name="report"
            size={22}
            style={styles.bottomButtonIcon}
          />
        </TouchableHighlight>

        {this._renderActionButton()}
      </View>
    )
  }

  _showReportMenu() {
    const buttons = {
      BLOCK: 'Block',
      REPORT: 'Report',
      CANCEL: 'Cancel'
    };

    const cancelButtonIndex = 2;

    ActionSheetIOS.showActionSheetWithOptions({
        options: _.values(buttons),
        cancelButtonIndex: cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButtonIndex) {
          const action = _.keys(buttons)[buttonIndex];

          // this action is one of the keys of the buttons except 'CANCEL': ['BLOCK' | 'REPORT']
          this.props.onComplete(action);
        }
      });
  }

  _renderActionButton() {
    if (!this.state.answerInputVisible) {
      let iconName;

      if (this.state.action === 'answer') {
        iconName = 'mode-comment';
      } else {
        iconName = 'thumb-up';
      }

      return (
        <TouchableHighlight onPress={() => this._onActionButtonPress()} activeOpacity={0.9} underlayColor={colors.primaryAlt} style={styles.bottomButton}>
          <Icon
            name={iconName}
            size={22}
            style={styles.bottomButtonIcon}
          />
        </TouchableHighlight>
      );
    }
  }

  _renderAnswer() {
    // FIXME: With the hidden input and a MessageBox rendering the message, user can't see or move the cursor (by holding on text).
    if (this.state.answerInputVisible) {
      return (
        <TouchableWithoutFeedback onPress={() => this.refs['answerInput'].focus()}>
          <View>
            <MessageBox text={this.state.answer} position="right"/>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  _onPoolItemLayout(event) {
    this.setState({
      height: event.nativeEvent.layout.height
    });
  }

  _onActionButtonPress() {
    // If this.state.action is 'answer', this button should enable answer input.
    // Otherwise it should initiate a chat with the user.
    if (this.state.action === 'answer') {
      this.refs['answerInput'].focus();

      this.setState({
        answerInputVisible: true
      });
    } else {
      this.props.onComplete('START-CONVERSATION');
    }
  }
}
