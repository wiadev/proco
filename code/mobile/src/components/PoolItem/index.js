import React from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';
import reactMixin from 'react-mixin';
import reactTimerMixin from 'react-timer-mixin';
import Icon from 'react-native-vector-icons/FontAwesome';

import MessageBox from '../Messages/Box';

import styles from './styles';
import colors from '../../core/style/colors';

@reactMixin.decorate(reactTimerMixin)
export default class PoolItem extends React.Component {
  static propTypes = {
    sequenceImages: React.PropTypes.array.isRequired,
    messages: React.PropTypes.array.isRequired,
    onComplete: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    // mock data
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
      // eventType: ['answer' | 'start-conversation']
      console.log(eventType, params);
    }
    // TODO: Should be reset to this:
    // sequenceImages: [undefined]
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

    this._runImageSequence();
  }

  render() {
    return (
      <View style={styles.poolItem} onLayout={event => this._onPoolItemLayout(event)}>
        <Image source={{uri: this.props.sequenceImages[this.state.imageSequenceCurrentFrame]}} style={styles.poolItemBackground}>
          <KeyboardAvoidingView behavior="position">
            <View style={[styles.poolItemContent, {height: this.state.height}]}>
              {this._renderMessages()}

              {this._renderAnswer()}

              {this._renderActionButton()}
            </View>

            <TextInput
              ref='answerInput'
              placeholder="Answer"
              returnKeyType="send"
              onSubmitEditing={() => this.props.onComplete('answer', {
                text: this.state.answer
              })}
              onChangeText={text => this.setState({
                answer: text
              })}
              value={this.state.text}
              editable={true}
            />
          </KeyboardAvoidingView>
        </Image>
      </View>
    );
  }

  _runImageSequence() {
    if (!this.state.imageSequenceRunning) {
      this.setState({
        imageSequenceRunning: true
      });

      let imageSequence = this.setInterval(() => {
        let newState = {};

        if (this.state.imageSequenceAction === 'increase') {
          if (this.state.imageSequenceCurrentFrame === 17) {
            newState.imageSequenceAction = 'decrease';
            newState.imageSequenceCurrentFrame = this.state.imageSequenceCurrentFrame - 1;
          } else {
            newState.imageSequenceCurrentFrame = this.state.imageSequenceCurrentFrame + 1;
          }
        }

        if (this.state.imageSequenceAction === 'decrease') {
          if (this.state.imageSequenceCurrentFrame === 0) {
            // newState.imageSequenceAction = 'increase';
            // newState.imageSequenceCurrentFrame = this.state.imageSequenceCurrentFrame + 1;
            this.clearInterval(imageSequence);
            this.setState({
              imageSequenceRunning: false
            });
          } else {
            newState.imageSequenceCurrentFrame = this.state.imageSequenceCurrentFrame - 1;
          }
        }

        this.setState(newState);
      }, 55.5);
    }
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

  _renderActionButton() {
    if (!this.state.answerInputVisible) {
      let iconName;

      if (this.state.action === 'answer') {
        iconName = 'comment';
      } else {
        iconName = 'thumbs-up';
      }

      return (
        <TouchableHighlight onPress={() => this._onActionButtonPress()} activeOpacity={0.9} underlayColor={colors.primaryAlt} style={styles.actionButton}>
          <Icon
            name={iconName}
            size={22}
            style={styles.actionButtonIcon}
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
      this.props.onComplete('start-conversation');
    }
  }
}
