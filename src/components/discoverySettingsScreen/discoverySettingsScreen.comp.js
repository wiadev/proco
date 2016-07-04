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
import { loadPage, defaultState } from './discoverySettingsScreen.reducer';
import store from './../../store/configureStore';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Picker from 'react-native-picker';
import {
  MKRangeSlider,
  MKRadioButton,
  MKSwitch,
} from 'react-native-material-kit';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
});

class shootNewProfileScreenComp extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
    this.groupRdSchool = new MKRadioButton.Group();
  }

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentDidMount() {
    store.dispatch(loadPage());
  }

  onPressBottomLeft() {
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
            <Text style={this.styles.btnSave}>Save</Text>
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
              >Male</Text>
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
                <Text style={[this.styles.blackText, { marginBottom: 10 }]}>22 - 30</Text>
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
                minValue={18}
                maxValue={78}
                step={1}
                lowerTrackColor={'rgb(249,59,95)'}
                onChange={(curValue) => this.setState({
                  min: curValue.min,
                  max: curValue.max,
                  })
                }
                onConfirm={(curValue) => {
                  console.log("Slider drag ended");
                  console.log(curValue);
                }}
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
                checked={true}
                group={this.groupRdSchool}
              />
              <Text style={[this.styles.blackText, { fontSize: 14 }]}>Only show people from Boğaziçi University</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <MKRadioButton
                checked={false}
                group={this.groupRdSchool}
              />
              <Text style={[this.styles.blackText, { fontSize: 14 }]}>Show people from other universites too</Text>
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
                  onPress={() => console.log('orange switch pressed')}
                  onCheckedChange={(e) => console.log('orange switch checked', e)}
                />
              </View>
            </View>
          </View>
          <View style={this.styles.inputBox}></View>
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
        />
      </View>
    );
  }
}

export default connect(() => defaultState.toJS())(shootNewProfileScreenComp);
