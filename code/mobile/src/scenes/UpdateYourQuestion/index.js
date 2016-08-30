import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';

import ProfileLoop from '../../components/ProfileLoop';
import MessageBox from '../../components/Chat/Box';
import { hideStatusBar, showStatusBar } from '../../modules/StatusBar/actions';
import styles from './styles';
import colors from '../../core/style/colors';

@connect(state => state)
export default class UpdateYourQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      done: false,
      question: "En sevdiğin Pokémon?"
    };
  }

  componentDidMount() {
    // TODO: Need to hide statusbar.
    this.props.dispatch(hideStatusBar());
  }

  componentWillUnmount() {
    this.props.dispatch(showStatusBar());
  }

  render() {
    return (
      <View style={styles.updateYourQuestion} onLayout={event => this._onUpdateYourQuestionLayout(event)}>
        <ProfileLoop isMounted={true} style={styles.profileLoop}>
          <KeyboardAvoidingView behavior="position">
            <View style={[styles.wrapper, {height: this.state.height}]}>
              <View style={styles.top}>
                <TouchableHighlight onPress={() => this._onCancel()}>
                  <View style={styles.closeButton}>
                    <Icon name="close" size={32} color={colors.primaryAlt} />
                  </View>
                </TouchableHighlight>
              </View>

              <View style={styles.content}>
                <TouchableWithoutFeedback onPress={() => this.refs['questionInput'].focus()}>
                  <View>
                    <MessageBox text={this.state.question} position="right" />
                  </View>
                </TouchableWithoutFeedback>

                <TextInput
                  ref='questionInput'
                  placeholder="Question"
                  returnKeyType="send"
                  onSubmitEditing={() => this._onComplete()}
                  onChangeText={text => this.setState({
                    question: text
                  })}
                  value={this.state.question}
                  editable={true}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ProfileLoop>
      </View>
    );
  }

  _onUpdateYourQuestionLayout(event) {
    this.setState({
      height: event.nativeEvent.layout.height
    });
  }

  _onCancel() {
    Actions.pop();
  }

  _onComplete() {
    // The question is available on this.state.question.
  }
}
