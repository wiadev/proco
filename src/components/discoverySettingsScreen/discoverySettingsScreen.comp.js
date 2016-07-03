import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loadPage, defaultState } from './discoverySettingsScreen.reducer';
import store from './../../store/configureStore';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

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
});

class shootNewProfileScreenComp extends Component {
  static getStyles() {
    return styles;
  }

  constructor(props) {
    super(props);
    this.styles = styles;
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
        <View style={this.styles.inputBox}></View>
        <View style={this.styles.inputBox}></View>
        <View style={this.styles.inputBox}></View>
        <View style={this.styles.inputBox}></View>
        <View style={this.styles.inputBox}></View>
      </View>
    );
  }
}

export default connect(() => defaultState.toJS())(shootNewProfileScreenComp);
