import React from 'react';
import {connect} from 'react-redux';
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
import {getPoolData, postAnswer, matchTo, markAsSeen} from '../../core/Api';
import styles from './styles';
import colors from '../../core/style/colors';

@connect(state => ({current_question: state.api.data.userInfo.current_question}))
export default class PoolItem extends React.Component {
  static propTypes = {
    isMounted: React.PropTypes.bool.isRequired,
    userId: React.PropTypes.string.isRequired,
    onComplete: React.PropTypes.func,
  };

  static defaultProps = {
    isMounted: true
  };

  constructor(props) {
    super(props);
    console.log("props", props);

    this.state = {
      height: 0,
      answerInputVisible: false,
    };
  }

  componentWillMount() {
    console.log(this.props);
  }

  render() {
    return (
      <View style={styles.poolItem} onLayout={event => this._onPoolItemLayout(event)}>
        <ProfileLoop isMounted={this.props.isMounted} photos={this.props.profileLoopPhotos}>
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
    if (this.props.receivedAnswer) {
      // This user has answered current user's question.
      return (
        <View>
          <MessageBox text={this.props.current_question} position="right" />

          <MessageBox text={this.props.receivedAnswer} position="left" />
        </View>
      );
    } else {
      // This user hasn't answered current user's question. Current user can answer now.
      return (
        <MessageBox text={this.props.question} position="left" />
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

      if (!this.props.receivedAnswer) {
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
    if (!this.props.receivedAnswer) {
      this.refs['answerInput'].focus();

      this.setState({
        answerInputVisible: true
      });
    } else {
      this._done('START-CONVERSATION');
    }
  }

  _done(action) {
    markAsSeen(this.props.userId, this.state.questionId);

    switch (action) {
      case 'START-CONVERSATION':
        // It's a MATCH! Start conversation.
        matchTo(key)
          .then(threadId => Actions.Conversation({thread_id: threadId, uid: this.props.userId}));
        break;
      case 'ANSWER':
        postAnswer(this.state.questionId, this.state.answer);
        break;
      default:
        // TODO: markAsSeen
    }
  }
}
