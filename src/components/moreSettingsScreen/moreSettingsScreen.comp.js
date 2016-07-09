import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loadPage, defaultState, saveMoreSettings } from './moreSettingsScreen.reducer';
import store from './../../store/configureStore';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
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

const styles = StyleSheet.create({
  preview: {
    position: 'relative',
    height,
    width,
    backgroundColor: '#dadada',
  },
  topMenu: {
    paddingTop: 20,
    height: 65,
    width,
    backgroundColor: 'white',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 0.5,
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
  },
  topMenuLeft: {
    flex: 0,
    width: width * 25 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  topMenuRight: {
    flex: 0,
    width: width * 25 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  btnSave: {
    color: 'rgb(71,71,71)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    textAlign: 'center',
  },
  topMenuMid: {
    flex: 0,
    width: width * 50 / 100,
    position: 'relative',
    alignItems: 'center',
  },
  menuTitle: {
    color: 'rgb(249,54,95)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 17,
    textAlign: 'center',
  },
  inputBox: {
    marginTop: 14,
    padding: 14,
    width,
    backgroundColor: 'white',
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(206,206,206)',
  },
  inputBoxLeft: {
    flex: 1,
    alignItems: 'flex-start',
    width: width * 50 / 100,
  },
  inputBoxRight: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: width * 50 / 100,
    flexDirection: 'row',
  },
  pinkText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
    color: 'rgb(249,59,95)',
  },
  blackText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
    color: 'rgb(66,66,66)',
  },
  pinkHead: {
    backgroundColor: 'rgb(249,59,95)',
    padding: 14,
    width,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinkHeadText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 13,
    color: 'white',
  },
  mkSwitch: {
    alignSelf: 'flex-end',
    height: 55,
    marginTop: 0,
    marginRight: -15,
  },
  mkSwitch2: {
    alignSelf: 'flex-end',
    height: 45,
    marginTop: -12,
    marginRight: -15,
  },
});

class moreSettingsScreenComp extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
    this.state = store.getState().moreSettingsScreenReducer.toJS();
  }

  state = {};

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentDidMount() {
    store.dispatch(loadPage());
  }

  onPressBottomLeft() {
    Actions.pop();
  }

  onSave() {
    store.dispatch(saveMoreSettings(this.state));
    Actions.pop();
  }

  render() {
    return (
      <View style={this.styles.preview}>
        <StatusBar
          backgroundColor="blue"
          barStyle="default"
          hidden={false}
        />
        <View style={this.styles.topMenu}>
          <View style={this.styles.topMenuLeft}>
            <Icon
              name="angle-left"
              size={42}
              color="rgba(0, 0, 0, 0.3)"
              onPress={() => {
                Actions.pop();
              }}
            />
          </View>
          <View style={this.styles.topMenuMid}>
            <Text style={this.styles.menuTitle}>More</Text>
          </View>
          <View style={this.styles.topMenuRight}>
            <Text style={this.styles.btnSave} onPress={::this.onSave}>Save</Text>
          </View>
        </View>
        <ScrollView>
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
                onColor={'rgb(249,59,95)'}
                thumbOnColor={'rgb(255, 212, 220)'}
                checked={this.state.suspendDiscovery}
              />
            </View>
          </View>
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
                  onColor={'rgb(249,59,95)'}
                  thumbOnColor={'rgb(255, 212, 220)'}
                  checked={this.state.newMessagesFromMatches}
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
                  onColor={'rgb(249,59,95)'}
                  thumbOnColor={'rgb(255, 212, 220)'}
                  checked={this.state.newMessages}
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
                  onColor={'rgb(249,59,95)'}
                  thumbOnColor={'rgb(255, 212, 220)'}
                  checked={this.state.newAnswers}
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
                  onColor={'rgb(249,59,95)'}
                  thumbOnColor={'rgb(255, 212, 220)'}
                  checked={this.state.trendingSpots}
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
                  onColor={'rgb(249,59,95)'}
                  thumbOnColor={'rgb(255, 212, 220)'}
                  checked={this.state.reminders}
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
                  onColor={'rgb(249,59,95)'}
                  thumbOnColor={'rgb(255, 212, 220)'}
                  checked={this.state.announcements}
                />
              </View>
            </View>
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

export default connect(() => defaultState.toJS())(moreSettingsScreenComp);
