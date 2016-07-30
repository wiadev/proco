import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PixelRatio,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { loadPage, getMessageCount, defaultState, addMessage } from './mainScreen.reducer';
import store from './../../store/configureStore';
import Camera from 'react-native-camera';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import Header from './../header/header';
import MessageCountIcon from './../messageCountIcon/messageCountIcon';
import MessageBox from './../messageBox/messageBox';
import { getCorrectFontSizeForScreen } from './../../core/functions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  answerButton: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 15,
    right: 20,
    borderRadius: 100,
  },
  answerIcon: {
    top: 13,
    left: -15,
    backgroundColor: 'transparent',
    transform: [{
      rotateY: '180deg',
    }],
  },
  messageList: {
    backgroundColor: 'transparent',
    flex: 0,
    height: 300,
    position: 'absolute',
    bottom: 100,
    justifyContent: 'flex-end',
    width,
  },
  topScreenMessageIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  menuList: {
    position: 'relative',
    top: height * 0.45,
  },
  menuItem: {
    marginBottom: 30,
  },
  menuItemText: {
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 20),
    textAlign: 'center',
  },
  avatar: {
    left: width / 2 - 80,
    height: 160,
    width: 160,
    margin: 0,
    position: 'absolute',
    top: height * 0.175,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 160,
    height: 160,
    margin: 0,
  },
});

class mainScreenComp extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  state = {
    messageCount: 0,
  };

  componentDidMount() {
    store.dispatch(loadPage());
    setTimeout(() => {
      store.dispatch(getMessageCount(3));
      store.dispatch(addMessage('En sevdigin dizi?'));
    }, 3000);
  }

  render() {
    const states = store.getState().mainScreenReducer;

    const messages = states.get('messageList').toJS().map((message, idx) => (
      <MessageBox key={'messages-' + idx} text={message.text} position="left" />
    ));

    let rightContainerHeader = null;
    if (states.get('messageCount') > 0) {
      rightContainerHeader = (
        <MessageCountIcon messageCount={states.get('messageCount')} />
      );
    }

    return (
      <View style={this.styles.container}>
        <Swiper
          horizontal={false}
          loop={false}
          showsPagination={false}
          index={1}
        >
          <View style={this.styles.preview}>
            <Image style={this.styles.backgroundImage} source={require('./../../images/stock-photo-56093412-selfi-man-with-his-dog-.jpg')} />
            <LinearGradient colors={['rgba(59, 28, 255, 0.8)', 'rgba(249, 54, 95, 0.8)']} style={this.styles.preview}>
              <Header
                hideLeft={true}
                hideRight={true}
              />
              <View style={this.styles.avatar}>
                <Image style={this.styles.avatarImage} source={require('./../../images/exampleAvatar.jpg')} />
              </View>
              <View style={this.styles.menuList}>
                <View style={this.styles.menuItem}>
                  <Text style={this.styles.menuItemText} onPress={Actions.updateYourQuestionScreen}>
                    Update your question
                  </Text>
                </View>
                <View style={this.styles.menuItem}>
                  <Text style={this.styles.menuItemText} onPress={Actions.shootNewProfileScreen}>
                    Shoot a new profile loop
                  </Text>
                </View>
                <View style={this.styles.menuItem}>
                  <Text style={this.styles.menuItemText} onPress={Actions.discoverySettingsScreen}>
                    Discovery Filters
                  </Text>
                </View>
                <View style={this.styles.menuItem}>
                  <Text style={this.styles.menuItemText} onPress={Actions.moreSettingsScreen}>
                    Settings
                  </Text>
                </View>
              </View>
              <IconM
                name="expand-more"
                size={44}
                color="white"
                style={{ opacity: 0.8,
                  backgroundColor: 'transparent',
                  textAlign: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 15,
                }}
              />
            </LinearGradient>
          </View>
          <View style={this.styles.defScreen}>
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={this.styles.preview}
              aspect={Camera.constants.Aspect.fill}
            >
              <Header
                hideLeft={true}
                hideMid={true}
                rightContainer={rightContainerHeader}
              />
              <IconM
                name="expand-less"
                size={44}
                color="white"
                style={{ opacity: 0.5,
                  backgroundColor: 'transparent',
                  textAlign: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 10,
                }}
              />
              <View style={this.styles.answerButton}>
                <Icon
                  name="comment"
                  size={22}
                  color="#F9365F"
                  style={this.styles.answerIcon}
                />
              </View>
              <View style={this.styles.messageList}>
                {messages}
              </View>
            </Camera>
          </View>
        </Swiper>
      </View>
    );
  }
}

export default connect(() => defaultState.toJS())(mainScreenComp);
