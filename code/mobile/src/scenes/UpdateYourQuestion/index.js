import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

import ProfileLoop from '../../components/ProfileLoop';
import MessageBox from '../../components/Chat/Box';
import { getUserLoops } from '../../core/Api';
import { postQuestion } from '../../modules/User/actions';
import { hideStatusBar, showStatusBar } from '../../modules/StatusBar/actions';
import styles from './styles';
import colors from '../../core/style/colors';

@connect(state => ({auth: state.auth, user: state.user}))
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
    // Need to hide statusbar.
    this.props.dispatch(hideStatusBar());

    this.setState({
      question: this.props.user.current_question
    });

    getUserLoops(this.props.auth.uid)
      .then(photos => this.setState({
        profileLoopPhotos: photos
      }));
  }

  componentWillUnmount() {
    this.props.dispatch(showStatusBar());
  }

  render() {
    return (
      <View style={styles.updateYourQuestion}>
        <ProfileLoop photos={this.state.profileLoopPhotos} photoOpacity={0.6}>
          <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
            {this._renderTop()}

            <View style={styles.container}>
              <TouchableWithoutFeedback onPress={() => this.refs['questionInput'].focus()}>
                <View>
                  <MessageBox text={this.state.question} position="right" />
                </View>
              </TouchableWithoutFeedback>

              {this._renderButtons()}

              <TextInput
                ref='questionInput'
                autoFocus={true}
                placeholder="Question"
                returnKeyType="done"
                onSubmitEditing={() => this.setState({
                  verifying: true
                })}
                onChangeText={text => this.setState({
                  question: text
                })}
                value={this.state.question}
                editable={true}
              />
            </View>
          </KeyboardAvoidingView>
        </ProfileLoop>
      </View>
    );
  }

  _renderTop() {
    if (!this.state.verifying) {
      return (
        <View>
          <TouchableHighlight onPress={() => this._cancel()}>
            <View style={styles.closeButton}>
              <Icon name="close" size={32} color={colors.primaryAlt} />
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  }

  _renderButtons() {
    if (this.state.verifying) {
      return (
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => this._cancel()}>
            <View style={styles.secondaryButton}>
              <Icon name="close" size={24} style={styles.secondaryButtonIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this._done()}>
            <View style={styles.secondaryButton}>
              <Icon name="check" size={24} style={styles.secondaryButtonIcon} />
            </View>
          </TouchableOpacity>
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
