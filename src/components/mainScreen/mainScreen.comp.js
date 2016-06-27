import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
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
  messageCount: {
    color: '#F9365F',
    left: -35,
    textAlign: 'center',
    width: 18,
    textShadowColor: 'rgba(0,0,0,0.5)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  messageIcon: {
    flex: 0,
    justifyContent: 'flex-end',
    marginTop: 20,
    marginRight: 0,
    alignItems: 'center',
    left: 35,
  },
  messageDot: {
    color: '#F9365F',
    left: -37,
    top: -8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  answerButton: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -65,
    right: -65,
    borderRadius: 100,
  },
  answerIcon: {
    top: 25,
    left: -80,
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
  messageBox: {
    flex: 0,
    backgroundColor: '#F9365F',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginTop: 5,
    width: 250,
  },
  messageBoxText: {
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: 18,
  },
  messagePrefixIcon: {
    transform: [{
      rotateX: '180deg',
    }, {
      rotateZ: '180deg',
    }],
    position: 'absolute',
    backgroundColor: 'transparent',
    left: -15,
    top: 9,
  },
  header: {
    flex: 0,
    height: 50,
    position: 'relative',
    width,
    flexDirection: 'column',
  },
  logo: {
    flex: 0,
    transform: [{ scale: 0.6 }],
    alignSelf: 'center',
    top: -15,
    width: 200,
  },
  topScreenMessageIcon: {
    flex: 0,
    marginTop: -20,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  leftButtonTextStyle: {
    alignSelf: 'flex-start',
    flex: 0,
    left: 20,
    top: 27,
  },
  menuList: {
    position: 'relative',
    top: 300,
  },
  menuItem: {
    marginBottom: 30,
  },
  menuItemText: {
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: 24,
    textAlign: 'center',
  },
});

class TitleText extends React.Component {
  render() {
    return (
      <Text style={{ fontSize: 48, color: 'white' }}>
        {this.props.label}
      </Text>
    );
  }
}

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
      <View style={this.styles.messageBox} key={ 'messages-' + idx }>
        <IconM
          name="reply"
          size={44}
          color="#F9365F"
          style={this.styles.messagePrefixIcon}
        />
        <Text style={this.styles.messageBoxText}>
          {message.text}
        </Text>
      </View>
    ));

    return (
      <View style={this.styles.container}>
        <Swiper
          loop={false}
          showsPagination={false}
          index={1}
        >
          <View style={this.styles.defScreen}>
            <TitleText label="Left" />
          </View>
          <Swiper
            horizontal={false}
            loop={false}
            showsPagination={false}
            index={1}
          >
            <View style={this.styles.preview}>
              <LinearGradient colors={['#3B1CFF', '#F9365F']} style={this.styles.preview}>
                <View style={this.styles.header}>
                  <IconM
                    name="close"
                    size={34}
                    color="rgba(255,255,255,0.8)"
                    style={this.styles.leftButtonTextStyle}
                  />
                  <Image style={this.styles.logo} source={require('./../../images/logo.png')} />
                  { states.get('messageCount') <= 0 ? null : (
                    <Icon.Button
                      color={'white'}
                      name="comment"
                      backgroundColor="transparent"
                      style={[this.styles.messageIcon, this.styles.topScreenMessageIcon]}
                      size={32}
                    >
                      <Text style={this.styles.messageCount}>
                        3
                      </Text>
                      <Icon
                        name="circle"
                        size={12}
                        color="#FFFFFF"
                        style={this.styles.messageDot}
                      />
                    </Icon.Button>
                  ) }
                </View>
                <View style={this.styles.menuList}>
                  <View style={this.styles.menuItem}>
                    <Text style={this.styles.menuItemText}>
                      Update your question
                    </Text>
                  </View>
                  <View style={this.styles.menuItem}>
                    <Text style={this.styles.menuItemText}>
                      Shoot a new profile loop
                    </Text>
                  </View>
                  <View style={this.styles.menuItem}>
                    <Text style={this.styles.menuItemText}>
                      Discovery Filters
                    </Text>
                  </View>
                  <View style={this.styles.menuItem}>
                    <Text style={this.styles.menuItemText}>
                      Settings
                    </Text>
                  </View>
                </View>
                <IconM
                  name="expand-more"
                  size={44}
                  color="white"
                  style={{ opacity: 0.5,
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
                { states.get('messageCount') <= 0 ? null : (
                  <Icon.Button
                    color={'white'}
                    name="comment"
                    backgroundColor="transparent"
                    style={this.styles.messageIcon}
                    size={32}
                  >
                    <Text style={this.styles.messageCount}>
                      3
                    </Text>
                    <Icon
                      name="circle"
                      size={12}
                      color="#FFFFFF"
                      style={this.styles.messageDot}
                    />
                  </Icon.Button>
                ) }
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
                    size={44}
                    color="#F9365F"
                    style={this.styles.answerIcon}
                  />
                </View>
                <View style={this.styles.messageList}>
                  {messages}
                </View>
              </Camera>
            </View>
            <View style={this.styles.defScreen}>
              <TitleText label="Bottom" />
            </View>
          </Swiper>
          <View style={this.styles.defScreen}>
            <TitleText label="Right" />
          </View>
        </Swiper>
      </View>
    );
  }
}

export default connect(() => defaultState.toJS())(mainScreenComp);
