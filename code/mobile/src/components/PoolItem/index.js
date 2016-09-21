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

import ProfileLoop from '../ProfileLoop';
import MessageBox from '../Chat/Box';
import styles from './styles';
import colors from '../../core/style/colors';

const initialState = {
  answerInputVisible: false,
  answer: ""
};

export default class PoolItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      ...initialState
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.question.question !== this.props.data.question.question) {
      let newState = Object.assign({}, this.state, initialState);

      this.setState(newState);
    }
  }

  render() {
    return (
      <View style={styles.poolItem} onLayout={event => this._onPoolItemLayout(event)}>
        <ProfileLoop video={this.props.data.profileLoop.file} repeat={true}>
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
              value={this.state.answer}
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
          this._done(action);
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
    switch (action) {
      case 'START-CONVERSATION':
        // It's a MATCH! Start conversation.
        this.props.onComplete(this.props.data.uid, 'match');
        break;
      case 'ANSWER':
        this.props.onComplete(this.props.data.uid, 'answer', {answer: this.state.answer});
        break;
      case 'BLOCK':
        this.props.onComplete(this.props.data.uid, 'block');
        break;
      case 'REPORT':
        this.props.onComplete(this.props.data.uid, 'report');
        break;
    }
  }
}

PoolItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  onComplete: React.PropTypes.func.isRequired
};
