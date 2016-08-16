import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loadPage, defaultState, saveMoreSettings } from './redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Picker from 'react-native-picker';
import {
  MKRangeSlider,
  MKRadioButton,
  MKSwitch,
  setTheme,
} from 'react-native-material-kit';
import { round } from 'lodash';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

setTheme({
  radioStyle: {
    fillColor: 'rgb(249,54,95)',
    borderOnColor: 'rgb(215,215,215)',
    borderOffColor: 'rgb(215,215,215)',
  },
});

import styles from './styles';

@connect(
  state => ({
    moreSettingsScreenReducer: state.moreSettingsScreenReducer,
  }),
)
class MoreSettingsScreen extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
    this.state = this.props.moreSettingsScreenReducer.toJS();
  }

  state = {};

  componentDidMount() {
    this.props.dispatch(loadPage());
  }

  onPressBottomLeft() {
    Actions.pop();
  }

  onSave() {
    this.props.dispatch(saveMoreSettings(this.state));
    Actions.pop();
  }

  render() {
    return (
      <View style={this.styles.preview}>
        <StatusBar barStyle="default" />
        <View style={this.styles.topMenu}>
          <View style={this.styles.topMenuLeft} />
          <View style={this.styles.topMenuMid}>
            <Text style={this.styles.menuTitle}>Settings</Text>
          </View>
          <View style={this.styles.topMenuRight}>
            <Text style={this.styles.btnSave} onPress={::this.onSave}>Done</Text>
          </View>
        </View>
        <ScrollView>
          <View style={[{
            flexDirection: 'column',
            width,
            marginTop: 5,
            marginBottom: -5,
            padding: 10,
            flex: 0,
            alignItems: 'center',
          }]}>
            <View style={{
              flex: 0,
              width: width - 28,
              flexDirection: 'row',
            }}>
              <View style={[this.styles.inputBoxLeft, {
                alignItems: 'flex-start',
                width: (width - 28) * 15 / 100,
                flex: 0,
              }]}>
                <IconM name="info-outline" size={42} color="rgba(0, 0, 0, 0.3)" />
              </View>
              <View style={[this.styles.inputBoxRight, {
                alignItems: 'flex-start',
                width: (width - 28) * 85 / 100,
                flex: 0,
                justifyContent: 'flex-start',
                flexDirection: 'column'
              }]}>
                <Text style={[this.styles.blackText, { fontSize: 12 }]}>
                  We synchronize your name, gender and birthdate from your facebook profile.
                  You've changed it there and can't see the changes here?
                  <Text style={{color: 'rgb(249,59,95)'}}> Tap here sync.</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={this.styles.inputBox}>
            <View style={this.styles.inputBoxLeft}>
              <Text style={this.styles.pinkText}>Birthday</Text>
            </View>
            <View style={this.styles.inputBoxRight}>
              <Text
                style={[this.styles.blackText]}
              >{this.state.birthday}</Text>
            </View>
          </View>
          <Text style={this.styles.underMessage}>You can only change your birthdate once</Text>
          <View style={this.styles.inputBox}>
            <View style={this.styles.inputBoxLeft}>
              <Text style={this.styles.pinkText}>School</Text>
            </View>
            <View style={this.styles.inputBoxRight}>
              <Text
                style={[this.styles.blackText]}
              >{this.state.school}</Text>
            </View>
          </View>
          <Text onPress={Actions.updateYourSchoolScreen} style={this.styles.underMessage}>No longer a __UNIVERSITY__ student?
          <Text style={{color: 'rgb(249,59,95)'}}> Tap here.</Text></Text>
          <View style={this.styles.inputBox}>
            <View style={this.styles.inputBoxLeft}>
              <Text style={[this.styles.blackText, { fontSize: 14 }]}>Suspend Discovery</Text>
            </View>
            <View style={this.styles.inputBoxRight}>
              <MKSwitch
                style={this.styles.mkSwitch2}
                onCheckedChange={(e) => {
                  this.setState({
                    suspendDiscovery: e.checked,
                  });
                }}
                onColor={'#43da5e'}
                thumbOnColor={'white'}
                checked={this.state.suspendDiscovery}
                trackSize={32}
              />
            </View>
          </View>
          <Text style={this.styles.underMessage}>
            When you suspend discovery, you'll no longer recieve answers
            or will be able to answer questions. You'll still be able to
            chat with current matches.
          </Text>
          <View style={[this.styles.inputBox, {
            flexDirection: 'column',
            alignItems: 'flex-start',
          }]}>
            <Text style={[this.styles.pinkText, { marginBottom: 10 }]}>Notification</Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={[this.styles.inputBoxLeft, {
                width: (width - 28) * 75 / 100,
              }]}>
                <Text style={[this.styles.blackText, { fontSize: 14 }]}>New messages from your matches</Text>
              </View>
              <View style={[this.styles.inputBoxRight, {
                width: (width - 28) * 25 / 100,
              }]}>
                <MKSwitch
                  style={this.styles.mkSwitch}
                  onCheckedChange={(e) => {
                    this.setState({
                      newMessagesFromMatches: e.checked,
                    });
                  }}
                  onColor={'#43da5e'}
                  thumbOnColor={'white'}
                  checked={this.state.newMessagesFromMatches}
                  trackSize={32}
                />
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={[this.styles.inputBoxLeft, {
                width: (width - 28) * 60 / 100,
              }]}>
                <Text style={[this.styles.blackText, { fontSize: 14 }]}>New messages</Text>
              </View>
              <View style={[this.styles.inputBoxRight, {
                width: (width - 28) * 40 / 100,
              }]}>
                <MKSwitch
                  style={this.styles.mkSwitch}
                  onCheckedChange={(e) => {
                    this.setState({
                      newMessages: e.checked,
                    });
                  }}
                  onColor={'#43da5e'}
                  thumbOnColor={'white'}
                  checked={this.state.newMessages}
                  trackSize={32}
                />
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={[this.styles.inputBoxLeft, {
                width: (width - 28) * 60 / 100,
              }]}>
                <Text style={[this.styles.blackText, { fontSize: 14 }]}>New answers</Text>
              </View>
              <View style={[this.styles.inputBoxRight, {
                width: (width - 28) * 40 / 100,
              }]}>
                <MKSwitch
                  style={this.styles.mkSwitch}
                  onCheckedChange={(e) => {
                    this.setState({
                      newAnswers: e.checked,
                    });
                  }}
                  onColor={'#43da5e'}
                  thumbOnColor={'white'}
                  checked={this.state.newAnswers}
                  trackSize={32}
                />
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={[this.styles.inputBoxLeft, {
                width: (width - 28) * 60 / 100,
              }]}>
                <Text style={[this.styles.blackText, { fontSize: 14 }]}>Trending Spots</Text>
              </View>
              <View style={[this.styles.inputBoxRight, {
                width: (width - 28) * 40 / 100,
              }]}>
                <MKSwitch
                  style={this.styles.mkSwitch}
                  onCheckedChange={(e) => {
                    this.setState({
                      trendingSpots: e.checked,
                    });
                  }}
                  onColor={'#43da5e'}
                  thumbOnColor={'white'}
                  checked={this.state.trendingSpots}
                  trackSize={32}
                />
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={[this.styles.inputBoxLeft, {
                width: (width - 28) * 60 / 100,
              }]}>
                <Text style={[this.styles.blackText, { fontSize: 14 }]}>Reminders</Text>
              </View>
              <View style={[this.styles.inputBoxRight, {
                width: (width - 28) * 40 / 100,
              }]}>
                <MKSwitch
                  style={this.styles.mkSwitch}
                  onCheckedChange={(e) => {
                    this.setState({
                      reminders: e.checked,
                    });
                  }}
                  onColor={'#43da5e'}
                  thumbOnColor={'white'}
                  checked={this.state.reminders}
                  trackSize={32}
                />
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={[this.styles.inputBoxLeft, {
                width: (width - 28) * 60 / 100,
              }]}>
                <Text style={[this.styles.blackText, { fontSize: 14 }]}>Announcements</Text>
              </View>
              <View style={[this.styles.inputBoxRight, {
                width: (width - 28) * 40 / 100,
              }]}>
                <MKSwitch
                  style={this.styles.mkSwitch}
                  onCheckedChange={(e) => {
                    this.setState({
                      announcements: e.checked,
                    });
                  }}
                  onColor={'#43da5e'}
                  thumbOnColor={'white'}
                  checked={this.state.announcements}
                  trackSize={32}
                />
              </View>
            </View>
          </View>
          <Text style={[this.styles.underMessage, {
            marginTop: 10,
            color: 'black',
            fontFamily: 'Montserrat-Regular',
          }]}>
            HELLO
          </Text>
          <View style={this.styles.inputBox}>
            <View style={this.styles.inputBoxLeft}>
              <Text style={[this.styles.blackText, { fontSize: 14 }]}>Contact</Text>
            </View>
            <View style={this.styles.inputBoxRight}>
              <Icon
                name="angle-right"
                size={30}
                color="#c2c2c2"
              />
            </View>
          </View>
          <View style={[this.styles.inputBox, {
            flexDirection: 'column',
            paddingLeft: 10,
            paddingRight: 10,
          }]}>
            <View style={{
              width: width - 20,
              marginBottom: 10,
            }}>
              <Text style={[this.styles.pinkText]}>People</Text>
            </View>
            <View style={{
              width: width - 20,
              marginBottom: 10,
            }}>
              <Text style={[this.styles.blackText, { fontSize: 14 }]}>These are the people who've made Proco. Tap to anyone to see
             their loops and chat with them.</Text>
            </View>
             <ScrollView
               ref={(scrollView) => { _scrollView = scrollView; }}
               automaticallyAdjustContentInsets={false}
               horizontal={true}
               scrollEventThrottle={200}
               style={styles.scrollView}
              >
              <View style={this.styles.avatar}>
                <Image style={this.styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')} />
              </View>
              <View style={this.styles.avatar}>
                <Image style={this.styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')} />
              </View>
              <View style={this.styles.avatar}>
                <Image style={this.styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')} />
              </View>
              <View style={this.styles.avatar}>
                <Image style={this.styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')} />
              </View>
              <View style={this.styles.avatar}>
                <Image style={this.styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')} />
              </View>
              <View style={this.styles.avatar}>
                <Image style={this.styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')} />
              </View>
              <View style={this.styles.avatar}>
                <Image style={this.styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')} />
              </View>
              <View style={this.styles.avatar}>
                <Image style={this.styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')} />
              </View>
              <View style={this.styles.avatar}>
                <Image style={this.styles.avatarImage} source={require('../../assets/images/exampleAvatar.jpg')} />
              </View>
             </ScrollView>
          </View>
          <Text style={[this.styles.underMessage, {
            marginTop: 10,
            color: 'black',
            fontFamily: 'Montserrat-Regular',
          }]}>
            LEGAL
          </Text>
          <View style={[this.styles.inputBox, {
            borderBottomWidth: 0,
          }]}>
            <View style={this.styles.inputBoxLeft}>
              <Text style={[this.styles.blackText, { fontSize: 14 }]}>Privacy Policy</Text>
            </View>
            <View style={this.styles.inputBoxRight}>
              <Icon
                name="angle-right"
                size={30}
                color="#c2c2c2"
              />
            </View>
          </View>
          <View style={[this.styles.inputBox, {
            marginTop: 0,
            borderBottomWidth: 0,
          }]}>
            <View style={this.styles.inputBoxLeft}>
              <Text style={[this.styles.blackText, { fontSize: 14 }]}>Terms of Service</Text>
            </View>
            <View style={this.styles.inputBoxRight}>
              <Icon
                name="angle-right"
                size={30}
                color="#c2c2c2"
              />
            </View>
          </View>
          <View style={[this.styles.inputBox, {
            marginTop: 0,
          }]}>
            <View style={this.styles.inputBoxLeft}>
              <Text style={[this.styles.blackText, { fontSize: 14 }]}>Licenses</Text>
            </View>
            <View style={this.styles.inputBoxRight}>
              <Icon
                name="angle-right"
                size={30}
                color="#c2c2c2"
              />
            </View>
          </View>
          <View style={this.styles.appLogoBottom}>
            <Image source={require('../../assets/images/logo.png')} />
          </View>
          <View style={this.styles.inputBox}>
            <View style={this.styles.inputBoxLeft}>
              <Text style={[this.styles.blackText, { fontSize: 14 }]}>Logout</Text>
            </View>
            <View style={this.styles.inputBoxRight}>
              <Icon
                name="angle-right"
                size={30}
                color="#c2c2c2"
              />
            </View>
          </View>
          <Text style={this.styles.underMessage}>
            No longer want to use Hello? You can <Text style={{color: 'rgb(249,59,95)'}}>tap here</Text> to suspend your account and come at anytime.
            Alternatively, you can suspend discovery so your questions and loop won't show up to other users.
          </Text>
          <View style={this.styles.companyLogoBottom}>
            <Image source={require('../../assets/images/logo.png')} />
            <Text style={this.styles.companyLogoBottomText}>This application was developed by Barbar Startup Factory</Text>
          </View>
        </ScrollView>
        <Picker
          ref={picker => this.picker = picker}
          style={{
            height: 250,
            width,
            left: 0,
            position: 'absolute',
            bottom: 0,
          }}
          showDuration={200}
          showMask={true}
          pickerData={['Male', 'Female']}
          selectedValue={'Male'}
          onPickerDone={(e) => {
            this.setState({
              gender: e[0],
            });
          }}
        />
      </View>
    );
  }
}

export default MoreSettingsScreen;
