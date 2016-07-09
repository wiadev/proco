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
import { loadPage, defaultState, saveDiscoverySettings } from './discoverySettingsScreen.reducer';
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
});

class discoverySettingsScreenComp extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
    this.groupRdSchool = new MKRadioButton.Group();
    this.state = store.getState().discoverySettingsScreenReducer.toJS();
  }

  state = {};

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentDidMount() {
    store.dispatch(loadPage());
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.showFriendsInDiscovery !== this.state.showFriendsInDiscovery) return false;
    return true;
  }

  onPressBottomLeft() {
    Actions.pop();
  }

  onSave() {
    store.dispatch(saveDiscoverySettings(this.state));
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
            <Text style={this.styles.menuTitle}>Discovery Settings</Text>
          </View>
          <View style={this.styles.topMenuRight}>
            <Text style={this.styles.btnSave} onPress={::this.onSave}>Save</Text>
          </View>
        </View>
        <ScrollView>
          <View style={this.styles.inputBox}>
            <View style={this.styles.inputBoxLeft}>
              <Text style={this.styles.pinkText}>Show these genders</Text>
            </View>
            <View style={this.styles.inputBoxRight}>
              <Text
                style={[this.styles.blackText, { marginRight: 10 }]}
                onPress={() => { this.picker.toggle(); }}
              >{this.state.gender}</Text>
              <Icon
                name="angle-right"
                size={32}
                color="rgba(0, 0, 0, 0.3)"
              />
            </View>
          </View>
          <View style={[this.styles.inputBox, {
            flexDirection: 'column',
          }]}>
            <View style={{
              flex: 0,
              width: width - 28,
              flexDirection: 'row',
            }}>
              <View style={this.styles.inputBoxLeft}>
                <Text style={[this.styles.pinkText, { marginBottom: 10 }]}>Age Limit</Text>
              </View>
              <View style={this.styles.inputBoxRight}>
                <Text style={[this.styles.blackText, { marginBottom: 10 }]}>{this.state.ageMin} - {this.state.ageMax}</Text>
              </View>
            </View>
            <View style={{
              flex: 0,
              width: width - 28,
            }}>
              <MKRangeSlider
                ref="sliderWithRange"
                min={16}
                max={80}
                minValue={this.state.ageMin}
                maxValue={this.state.ageMax}
                step={1}
                lowerTrackColor={'rgb(249,59,95)'}
                onChange={(curValue) => this.setState({
                  ageMin: round(curValue.min),
                  ageMax: round(curValue.max),
                  })
                }
              />
            </View>
          </View>
          <View style={[this.styles.inputBox, {
            flexDirection: 'column',
            alignItems: 'flex-start',
          }]}>
            <Text style={[this.styles.pinkText, { marginBottom: 10 }]}>School</Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <MKRadioButton
                checked={this.state.onlyFromSchool}
                group={this.groupRdSchool}
              />
              <Text style={[this.styles.blackText, { fontSize: 14 }]} onPress={() => {
                this.setState({
                  onlyFromSchool: true,
                });
              }}>Only show people from Boğaziçi University</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <MKRadioButton
                checked={!this.state.onlyFromSchool}
                group={this.groupRdSchool}
              />
              <Text style={[this.styles.blackText, { fontSize: 14 }]} onPress={() => {
                this.setState({
                  onlyFromSchool: false,
                });
              }}>Show people from other universites too</Text>
            </View>
          </View>
          <View style={[this.styles.inputBox, {
            flexDirection: 'column',
            alignItems: 'flex-start',
          }]}>
            <Text style={[this.styles.pinkText, { marginBottom: 10 }]}>Other</Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={[this.styles.inputBoxLeft, {
                width: (width - 28) * 60 / 100,
              }]}>
                <Text style={[this.styles.blackText, { fontSize: 14 }]}>Show my friends in Discovery</Text>
              </View>
              <View style={[this.styles.inputBoxRight, {
                width: (width - 28) * 40 / 100,
              }]}>
                <MKSwitch
                  style={{ alignSelf: 'flex-end' }}
                  onCheckedChange={(e) => {
                    this.setState({
                      showFriendsInDiscovery: e.checked,
                    });
                  }}
                  onColor={'rgb(249,59,95)'}
                  thumbOnColor={'rgb(255, 212, 220)'}
                  checked={this.state.showFriendsInDiscovery}
                />
              </View>
            </View>
          </View>
          <View style={[this.styles.inputBox, {
            padding: 0,
          }]}>
            <View style={this.styles.pinkHead}>
              <View style={[this.styles.inputBoxLeft, {
                width: width * 75 / 100,
                flex: 0,
              }]}>
                <Text style={this.styles.pinkHeadText}>Tell us more about yourself to see more likeminded people in Discovery</Text>
              </View>
              <View style={[this.styles.inputBoxRight]}>
                <Icon
                  name="angle-down"
                  size={42}
                  color="rgba(0, 0, 0, 0.3)"
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

export default connect(() => defaultState.toJS())(discoverySettingsScreenComp);
