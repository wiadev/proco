import React from "react";
import {
  View,
  KeyboardAvoidingView,
  ActionSheetIOS,
  TouchableOpacity
} from "react-native";
import PureRenderMixin from "react-addons-pure-render-mixin";
import _ from "lodash";

import ProfileLoop from "../ProfileLoop";
import Bubble from '../Bubble';
import Button from '../Button';
import styles from "./styles";

const initialState = {
  answer: "",
};

export default class PoolItem extends React.Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    this.state = {
      height: 0,
      ...initialState,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.question.question !== this.props.question.question) {
      let newState = Object.assign({}, this.state, initialState);

      this.setState(newState);
    }
  }

  render() {
    return (
      <View style={styles.poolItem} onLayout={event => this._onPoolItemLayout(event)}>
        <ProfileLoop video={this.props.profileLoop.file} repeat={true}>
          <KeyboardAvoidingView behavior="position">
            <View style={[styles.poolItemContent, {height: this.state.height}]}>
              {this._renderQuestionAndAnswer()}
              {this._renderActionButton()}
            </View>
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
          <Bubble type="text" position="right" contentSize="big" text={this.props.question.question} />

          <Bubble type="text" position="left" contentSize="big" text={this.props.receivedAnswer} style={styles.nonTopBubble} />
        </View>
      );
    } else {
      // This user hasn't answered current user's question. Current user can answer now.
      return (
        <View>
          <Bubble type="text" position="left" contentSize="big" text={this.props.question.question} />

          <Bubble
            type="input"
            position="right"
            contentSize="big"
            returnKeyType="send"
            placeholder="Answer..."
            value={this.state.answer}
            onChange={answer => this.setState({answer: answer})}
            onSubmitEditing={() => this._done('ANSWER')}
            style={styles.nonTopBubble}
          />
        </View>
      );
    }
  }

  _showDispleaseMenu() {
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
    if (this.props.receivedAnswer) {
      return (
        <View style={styles.actionButtonContainer}>
          <Button
            type="image"
            highlight={true}
            onPress={() => this._done('START-CONVERSATION')}
            image={require('../../assets/images/mascot.png')}
          />
        </View>
      );
    }
  }

  _onPoolItemLayout(event) {
    this.setState({
      height: event.nativeEvent.layout.height
    });
  }

  _done(action) {
    switch (action) {
      case 'START-CONVERSATION':
        // It's a MATCH! Start conversation.
        this.props.onComplete(this.props.uid, 'match');
        break;
      case 'ANSWER':
        this.props.onComplete(this.props.uid, 'answer', {answer: this.state.answer});
        break;
      case 'BLOCK':
        this.props.onComplete(this.props.uid, 'block');
        break;
      case 'REPORT':
        this.props.onComplete(this.props.uid, 'report');
        break;
    }
  }
}

PoolItem.propTypes = {
  onComplete: React.PropTypes.func.isRequired
};
