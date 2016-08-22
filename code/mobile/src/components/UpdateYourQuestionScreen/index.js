import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { loadPage, defaultState, questionChanged } from './redux';
import store from '../../store/configureStore';
import { connect } from 'react-redux';
import Header from '../Header';
import MessageBox from '../Messages/Box';
import {
  MKTextField,
} from 'react-native-material-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

class UpdateYourQuestionScreen extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
    this.state.visibleHeight = Dimensions.get('window').height;
  }

  state = {
    question: '',
    height: 0,
  };

  componentDidMount() {
    store.dispatch(loadPage());
    Keyboard.addListener('keyboardWillShow', (e) => {
      this.keyboardWillShow(e);
    });

    Keyboard.addListener('keyboardWillHide', (e) => {
      this.keyboardWillHide(e);
    });
  }

  componentWillUnmount() {
    Keyboard.removeAllListeners('keyboardWillShow');
    Keyboard.removeAllListeners('keyboardWillHide');
  }

  keyboardWillShow(e) {
    const newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({
      visibleHeight: newSize,
    });
  }

  keyboardWillHide() {
    this.setState({
      visibleHeight: Dimensions.get('window').height,
    });
  }

  onSubmitEditing() {
    store.dispatch(questionChanged(this.state.question));
    Actions.pop();
  }

  onChangeText(question) {
    this.setState({
      question,
    });
  }

  onChange(e) {
    this.setState({
      height: e.nativeEvent.contentSize.height,
    });
  }

  render() {
    return (
      <View style={[this.styles.preview, {
        height: this.state.visibleHeight
      }]}>
        <Image
          style={this.styles.backgroundImage}
          source={require('../../assets/images/stock-photo-56093412-selfi-man-with-his-dog-.jpg')}
        />
        <LinearGradient
          colors={['rgba(59, 28, 255, 0.8)', 'rgba(249, 54, 95, 0.8)']}
          style={[this.styles.preview, {
            height: this.state.visibleHeight
          }]}
        >
          <Header
            hideRight={true}
            hideMid={true}
            leftContainer={
              <Ionicons
                name="ios-close"
                size={60}
                color="#FFFFFF"
                style={this.styles.leftButtonTextStyle}
                onPress={() => {
                  Actions.pop();
                }}
              />
            }
          />
          <View style={this.styles.questionArea}>
            <Image style={this.styles.questionImage} source={require('../../assets/images/shape.png')} />
            <Text style={this.styles.questionLabel}>
              Now, ask your question.
            </Text>
          </View>
          <View style={this.styles.textBoxArea}>
            <MessageBox position="right" backgroundColor={'white'} color={'#F9365F'}>
              <MKTextField
                tintColor={'transparent'}
                placeholder="Your question"
                underlineEnabled={false}
                placeholderTextColor={'rgba(249, 53, 94, 0.6)'}
                returnKeyType="send"
                multiline={true}
                onSubmitEditing={::this.onSubmitEditing}
                onChangeText={::this.onChangeText}
                onChange={::this.onChange}
                style={{
                  flex: 1,
                  minHeight: 25,
                  height: Math.max(35, this.state.height),
                }}
                textInputStyle={{
                  flex: 1,
                  minWidth: 150,
                  minHeight: 25,
                  color: '#F9365F',
                  fontFamily: 'OpenSans-Light',
                }}
              />
            </MessageBox>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default connect(() => defaultState.toJS())(UpdateYourQuestionScreen);
