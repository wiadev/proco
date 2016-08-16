import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PixelRatio,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { loadPage, getMessageCount, defaultState, addMessage } from './redux';
import Camera from 'react-native-camera';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import Header from '../Header';
import MessageCountIcon from '../MessageCountIcon';
import MessageBox from '../MessageBox';
import { getCorrectFontSizeForScreen } from '../../core/functions';
import styles from './styles';

@connect(
  state => ({
    mainScreenReducer: state.mainScreenReducer,
  }),
)
class MainScreen extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
    //this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
  }

  state = {
    messageCount: 0,
    hideStatusBar: true
  };

  componentDidMount() {
    this.props.dispatch(loadPage());
    setTimeout(() => {
      this.props.dispatch(getMessageCount(3));
      this.props.dispatch(addMessage('En sevdigin dizi?'));
    }, 3000);
  }

  render() {

    const states = this.props.mainScreenReducer;
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
        <StatusBar
          hidden={this.state.hideStatusBar}
          showHideTransition="slide"
          barStyle="light-content"
        />
        <Swiper
          horizontal={false}
          loop={false}
          showsPagination={false}
          index={1}
          onMomentumScrollEnd={
            (e, state) => this.setState({ hideStatusBar: (state.index === 1) })
          }
        >
          <View style={this.styles.preview}>
            <Image style={this.styles.backgroundImage} source={require('../../assets/images/stock-photo-56093412-selfi-man-with-his-dog-.jpg')} />
            <LinearGradient colors={['rgba(59, 28, 255, 0.8)', 'rgba(249, 54, 95, 0.8)']} style={this.styles.preview}>
              <Header
                hideLeft={true}
                hideRight={true}
              />
              <View style={this.styles.avatar}>
                <Image style={this.styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')} />
              </View>
              <View style={this.styles.menuList}>
                <View style={this.styles.menuItem}>
                  <Text style={this.styles.menuItemText} onPress={Actions.UpdateYourQuestionScreen}>
                    Update your question
                  </Text>
                </View>
                <View style={this.styles.menuItem}>
                  <Text style={this.styles.menuItemText} onPress={Actions.ShootNewProfileScreen}>
                    Shoot a new profile loop
                  </Text>
                </View>
                <View style={this.styles.menuItem}>
                  <Text style={this.styles.menuItemText} onPress={Actions.DiscoverySettingsScreen}>
                    Discovery Filters
                  </Text>
                </View>
                <View style={this.styles.menuItem}>
                  <Text style={this.styles.menuItemText} onPress={Actions.MoreSettingsScreen}>
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

export default connect(() => defaultState.toJS())(MainScreen);
