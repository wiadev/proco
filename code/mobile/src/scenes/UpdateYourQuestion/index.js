import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StatusBar,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

import Loading from '../../components/Loading';
import Text from '../../components/Text';
import Button from '../../components/Button';
import ProfileLoop from '../../components/ProfileLoop';
import Bubble from '../../components/Bubble';
import { getProfileLoopOf } from '../../modules/profiles/loops/api';
import { questionUpdateRequest } from '../../modules/user/actions';
import styles from './styles';

const statuses = {
  EDITING: 'editing',
  VERIFYING: 'verifying',
  VIEWING: 'viewing'
};

@connect(
  state => ({
    auth: state.auth,
    current_question: state.user.info.get('current_question'),
  }),
  dispatch => ({
    update: (question) => dispatch(questionUpdateRequest(question)),
  })
)
export default class UpdateYourQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: statuses.EDITING,
      overlayWidth: 0,
      question: "",
      profileLoop: null
    };
  }

  componentDidMount() {
    this.setState({
      question: this.props.current_question
    });

    getProfileLoopOf(this.props.auth.uid)
      .then(data => this.setState({profileLoop: data.file}));
  }

  render() {
    if (this.state.profileLoop === null) {
      return (
        <Loading />
      );
    }

    return (
      <View style={styles.updateYourQuestion}>
        <StatusBar hidden={true} />

        <ProfileLoop video={this.state.profileLoop}>
          {this._renderOverlay()}

          <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>

            {this._renderTop()}

            <View style={styles.container}>
              <Bubble
                type="input"
                position="right"
                autoFocus={true}
                value={this.state.question}
                onFocus={() => this.setState({status: statuses.EDITING})}
                onBlur={() => this.setState({status: statuses.VERIFYING})}
                onChange={question => this.setState({question: question})}
                style={styles.inputBubble}
              />

              {this._renderButtons()}
            </View>
          </KeyboardAvoidingView>
        </ProfileLoop>
      </View>
    );
  }

  _renderOverlay() {
    if (this.state.status === statuses.EDITING) {
      return (
        <View style={styles.overlay} onLayout={event => this.setState({overlayWidth: event.nativeEvent.layout.width})}>
          <Image source={require('../../assets/images/ask-question.png')} style={[styles.overlayImage, {width: this.state.overlayWidth / 3, height: this.state.overlayWidth / 3}]} />

          <Text style={styles.overlayText}>Now ask your question.</Text>
        </View>
      );
    }
  }

  _renderTop() {
    if (this.state.status !== statuses.VERIFYING) {
      return (
        <TouchableOpacity onPress={() => this._cancel()} style={styles.closeButtonContainer} activeOpacity={0.9}>
          <Icon name="ios-close" style={styles.closeButton} />
        </TouchableOpacity>
      );
    }
  }

  _renderButtons() {
    if (this.state.status === statuses.VERIFYING) {
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
    this.props.update(this.state.question);

    this.setState({
      status: statuses.VIEWING
    });
  }
}
