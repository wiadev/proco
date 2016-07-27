import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
  PixelRatio,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loadPage, defaultState, updateYourSchool } from './updateYourSchoolScreen.reducer';
import store from './../../store/configureStore';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {
  MKTextField,
} from 'react-native-material-kit';
import { getCorrectFontSizeForScreen } from './../../core/functions';

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
    fontFamily: 'Montserrat-Regular',
    fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 11),
    color: 'rgb(249,59,95)',
  },
  blackText: {
    fontFamily: 'Montserrat-Light',
    fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 9),
    color: 'rgb(99,99,99)',
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
  email: {
    borderWidth: 0,
  },
  emailTxt: {
    fontFamily: 'Montserrat-Light',
    color: 'black',
    fontSize: 26,
    height: 35,
    marginTop: 10,
    width,
  },
  rightBoxText: {
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    fontSize: 16,
  },
  rightBoxText2: {
    fontFamily: 'Montserrat-Light',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    paddingTop: 3,
  },
});

class updateYourSchoolScreenComp extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
    this.state = store.getState().updateYourSchoolScreenReducer.toJS();
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
    store.dispatch(updateYourSchool(this.state));
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
            <Text style={this.styles.menuTitle}>Update Your School</Text>
          </View>
          <View style={this.styles.topMenuRight}>
            <Text style={this.styles.btnSave} onPress={::this.onSave}>Verify</Text>
          </View>
        </View>
        <ScrollView>
          <View style={[this.styles.inputBox, {
            flexDirection: 'column',
            backgroundColor: '#613ded',
            marginTop: 0,
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
                <IconM name="info-outline" size={42} color="#FFFFFF" />
              </View>
              <View style={[this.styles.inputBoxRight, {
                alignItems: 'flex-start',
                width: (width - 28) * 85 / 100,
                flex: 0,
                justifyContent: 'flex-start',
                flexDirection: 'column'
              }]}>
                <Text style={this.styles.rightBoxText}>
                  Did you graduated?
                </Text>
                <Text style={this.styles.rightBoxText2}>
                  You don't have to do anything. You can continue to enjoy PROCO as long as your school e-mail is active.
                </Text>
              </View>
            </View>
          </View>
          <View style={[this.styles.inputBox, {
            flexDirection: 'column',
            marginTop: 0,
          }]}>
            <View style={{
              flex: 0,
              width: width - 28,
              flexDirection: 'row',
            }}>
              <View>
                <Text style={[this.styles.pinkText, { marginBottom: 3 }]}>DID YOU CHANGE YOUR SCHOOL?</Text>
                <Text style={[this.styles.blackText, { marginBottom: 10 }]}>Please enter your new school e-mail in the field below</Text>
              </View>
            </View>
            <View style={{
              flex: 0,
              width: width - 28,
            }}>
              <MKTextField
                tintColor={'transparent'}
                textInputStyle={this.styles.emailTxt}
                placeholder="Please enter here"
                style={this.styles.email}
                underlineEnabled={false}
                placeholderTextColor={'rgb(150,150,150)'}
                onTextChange={(email) => { this.setState({ email }); }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(() => defaultState.toJS())(updateYourSchoolScreenComp);
