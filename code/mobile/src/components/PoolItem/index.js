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
import { Actions } from 'react-native-router-flux';

import ProfileLoop from '../ProfileLoop';
import MessageBox from '../Chat/Box';
import {postAnswer, matchTo, markAsSeen} from '../../core/Api';
import styles from './styles';
import colors from '../../core/style/colors';

export default class PoolItem extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    isMounted: React.PropTypes.bool.isRequired,
    onComplete: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    isMounted: true
  };

  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      answerInputVisible: false,
    };
  }

  render() {
    return (
      <View style={styles.poolItem} onLayout={event => this._onPoolItemLayout(event)}>
        <ProfileLoop isMounted={this.props.isMounted} photos={this.props.data.profileLoopPhotos}>
          <KeyboardAvoidingView behavior="position">
            <View style={[styles.poolItemContent, {height: this.state.height}]}>
              {this._renderQuestionAndAnswer()}

              {this._renderAnswer()}

              {this._renderBottomButtons()}
            </View>

            <TextInput
              ref='answerInput'
              returnKeyType="send"
              onSubmitEditing={() => this._done('ANSWER')}
              onChangeText={answer => this.setState({answer: answer})}
              value={this.state.text}
              editable={true}
            />
          </KeyboardAvoidingView>
        </ProfileLoop>
      </View>
    );
  }

  _renderQuestionAndAnswer() {
    if (this.props.data.receivedAnswer) {
      // This user has answered current user's question.
      return (
        <View>
          <MessageBox text={this.props.data.question.question} position="right" />

          <MessageBox text={this.props.data.receivedAnswer} position="left" />
        </View>
      );
    } else {
      // This user hasn't answered current user's question. Current user can answer now.
      return (
        <MessageBox text={this.props.data.question.question} position="left" />
      );
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
    // If current user is answering, the action will complete when answer is submitted.
    if (!this.state.answerInputVisible) {
      let iconName;

      if (!this.props.data.receivedAnswer) {
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
    if (!this.props.data.receivedAnswer) {
      this.refs['answerInput'].focus();

      this.setState({
        answerInputVisible: true
      });
    } else {
      this._done('START-CONVERSATION');
    }
  }

  _done(action) {
    markAsSeen(this.props.data.uid, this.props.data.question.qid);

    switch (action) {
      case 'START-CONVERSATION':
        // It's a MATCH! Start conversation.
        matchTo(key)
          .then(threadId => Actions.Conversation({thread_id: threadId, uid: this.props.data.uid}));
        break;
      case 'ANSWER':
        postAnswer(this.props.data.question.qid, this.state.answer);
        break;
      default:
        // TODO: markAsSeen
    }
  }
}
