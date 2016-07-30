import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { loadPage, defaultState, questionChanged } from './updateYourQuestionScreen.reducer';
import store from './../../store/configureStore';
import { connect } from 'react-redux';
import Header from './../header/header';
import MessageBox from './../messageBox/messageBox';
import {
  MKTextField,
} from 'react-native-material-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  preview: {
    position: 'relative',
    height,
    width,
  },
  backgroundImage: {
    position: 'absolute',
    height,
    width,
  },
  questionArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionImage: {
    marginBottom: 25,
  },
  questionLabel: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: 21,
    textAlign: 'center',
  },
  textBoxArea: {
    width,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 30,
  },
  textBoxInput: {
    fontFamily: 'Montserrat-Light',
  },
  textBoxLabel: {
    fontFamily: 'Montserrat-Light',
  },
  leftButtonTextStyle: {
    marginLeft: 10,
  },
});

class updateYourQuestionScreenComp extends Component {
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
          source={require('./../../images/stock-photo-56093412-selfi-man-with-his-dog-.jpg')}
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
            <Image style={this.styles.questionImage} source={require('./../../images/shape.png')} />
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
                  fontFamily: 'Montserrat-Light',
                }}
              />
            </MessageBox>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default connect(() => defaultState.toJS())(updateYourQuestionScreenComp);
