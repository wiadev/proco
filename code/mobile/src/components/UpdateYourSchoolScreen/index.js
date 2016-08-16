import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loadPage, defaultState, updateYourSchool } from './redux';
import store from '../../store/configureStore';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {
  MKTextField,
} from 'react-native-material-kit';
import styles from './styles';

class UpdateYourSchoolScreen extends Component {
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
            <Ionicons
              name="ios-close"
              size={50}
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

export default connect(() => defaultState.toJS())(UpdateYourSchoolScreen);
