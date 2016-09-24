import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

import Button from '../../components/Button';
import ProfileLoop from '../../components/ProfileLoop';
import Bubble from '../../components/Bubble';
import { getProfileLoop } from '../../modules/Profiles/Loops/api';
import { postQuestion } from '../../modules/User/actions';
import styles from './styles';
import colors from '../../core/style/colors';

@connect(state => ({auth: state.auth, user: state.api.data.userInfo}))
export default class UpdateYourQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profileLoopPhotos: [],
      verifying: false,
      question: ""
    };
  }

  componentDidMount() {
    this.setState({
      question: this.props.user.current_question
    });

    getProfileLoop(this.props.user.loop_key)
      .then(photos => {
        this.setState({
          profileLoopPhotos: photos
        })
      });
  }

  render() {
    return (
      <View style={styles.updateYourQuestion}>
        <StatusBar hidden={true} />

        <ProfileLoop repeat={true}>
          <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
            {this._renderTop()}

            <View style={styles.container}>
              <Bubble
                type="input"
                position="right"
                autoFocus={true}
                value={this.state.question}
                onFocus={() => this.setState({verifying: false})}
                onBlur={() => this.setState({verifying: true})}
                onChange={question => this.setState({question: question})}
                onSubmitEditing={() => this.setState({verifying: true})}
                style={styles.inputBubble}
              />

              {this._renderButtons()}
            </View>
          </KeyboardAvoidingView>
        </ProfileLoop>
      </View>
    );
  }

  _renderTop() {
    if (!this.state.verifying) {
      return (
        <TouchableOpacity onPress={() => this._cancel()} style={styles.closeButtonContainer} activeOpacity={0.9}>
          <Icon name="ios-close" style={styles.closeButton} />
        </TouchableOpacity>
      );
    }
  }

  _renderButtons() {
    if (this.state.verifying) {
      return (
        <View style={styles.buttons}>
          <Button
            type="icon"
            icon="ios-close"
            onPress={() => this._cancel()}
          />

          <Button
            type="icon"
            icon="ios-checkmark"
            highlight={true}
            onPress={() => this._done()}
          />
        </View>
      );
    }
  }

  _cancel() {
    // User cancelled, need to go to previous scene.
    Actions.pop();
  }

  _done() {
    // Editing is complete. User's question is available on this.state.question.
    postQuestion(this.state.question);

    this.setState({
      verifying: false
    });
  }
}
