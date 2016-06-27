import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {
  MKTextField,
} from 'react-native-material-kit';
import DatePicker from 'react-native-datepicker';
import { loadPage, registerAccount } from './registerForm.reducer';
import store from './../../store/configureStore';
import Header from './../header/header';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  linearGradient: {
    opacity: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignSelf: 'stretch',
    height,
  },
  navBar: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  leftButtonTextStyle: {
    backgroundColor: 'transparent',
    color: 'white',
    width: 30,
  },
  logo: {
    transform: [{ scale: 0.6 }],
    alignSelf: 'center',
    flex: 0,
    top: 8,
    left: -5,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'flex-start',
    paddingTop: 15,
    height: 100,
    flexDirection: 'row',
    top: 50,
  },
  leftBox: {
    width: width * 0.2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 2,
    paddingTop: 9,
  },
  rightBox: {
    alignSelf: 'auto',
    width: width * 0.8,
    paddingRight: 5,
    paddingTop: 9,
  },
  rightBoxText: {
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    fontSize: 16,
  },
  rightBoxText2: {
    fontFamily: 'Montserrat-Light',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
    paddingTop: 3,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    bottom: -150,
    alignItems: 'center',
    width,
  },
  footerText: {
    fontFamily: 'Montserrat-Light',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
  },
  email: {
    borderWidth: 0,
  },
  emailLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
  },
  emailTxt: {
    fontFamily: 'Montserrat-Light',
    color: 'white',
    fontSize: 26,
    height: 35,
    marginTop: 10,
    width,
  },
  datepicker: {
    width,
  },
  bornBox: {
    marginTop: 90,
    paddingLeft: 20,
  },
  emailBox: {
    marginTop: 20,
    paddingLeft: 20,
  },
  btnNext: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  header: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 50,
    width,
  },
});

const dpCustom = StyleSheet.create({
  dateIcon: {
    width: 0,
    height: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  dateInput: {
    flex: 1,
    height: 35,
    borderWidth: 0,
    borderColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  dateText: {
    fontFamily: 'Montserrat-Light',
    color: 'white',
    fontSize: 26,
  },
  dateTouchBody: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class registerFormComp extends Component {
  static getStyles() {
    return styles;
  }

  static onRenderBackButton() {
    return (<Icon
      name="angle-left"
      size={42}
      color="#FFFFFF"
      style={styles.leftButtonTextStyle}
      onPress={registerFormComp.onClickBack}
    />);
  }

  constructor(props) {
    super(props);
    this.styles = styles;
  }

  state = {
    date: '01/01/1990',
    email: '',
  };

  componentDidMount() {
    store.dispatch(loadPage());
  }

  onRightClick() {
    store.dispatch(registerAccount(this.state.date, this.state.email));
    Actions.mainScreen();
  }

  onClickBack() {
    Actions.intro();
  }

  render() {
    return (
      <View style={this.styles.container}>
        <LinearGradient colors={['#3B1CFF', '#F9365F']} style={this.styles.linearGradient}>
          <Header
            leftContainer={
              <Icon
                name="angle-left"
                size={42}
                color="#FFFFFF"
                style={this.styles.leftButtonTextStyle}
                onPress={::this.onClickBack}
              />
            }
            rightContainer={
              <Text style={this.styles.btnNext} onPress={::this.onRightClick}>
                Next
              </Text>
            }
          />

          <View style={this.styles.infoBox}>
            <View style={this.styles.leftBox}>
              <Icon name="info-circle" size={42} color="#FFFFFF" />
            </View>
            <View style={this.styles.rightBox}>
              <Text style={this.styles.rightBoxText}>
                Hello Batuhan.
              </Text>
              <Text style={this.styles.rightBoxText2}>
                to continue, we need you to complete this short form.
              </Text>
            </View>
          </View>

          <View style={this.styles.bornBox}>
            <Text style={this.styles.emailLabel}>
              VERIFY WHEN YOU WERE BORN
            </Text>
            <DatePicker
              style={this.styles.datepicker}
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              iconSource={null}
              customStyles={dpCustom}
              date={this.state.date}
              onDateChange={(date) => { this.setState({ date }); }}
            />
          </View>

          <View style={this.styles.emailBox}>
            <Text style={this.styles.emailLabel}>
              VERIFY WHAT YOUR EMAIL IS
            </Text>
            <MKTextField
              tintColor={'transparent'}
              textInputStyle={this.styles.emailTxt}
              placeholder="Please enter here"
              style={this.styles.email}
              underlineEnabled={false}
              placeholderTextColor={'white'}
              defaultValue={'..@..com'}
              onTextChange={(email) => { this.setState({ email }); }}
            />
          </View>

          <View style={this.styles.footer}>
            <Text style={this.styles.footerText} onPress={this.onPressHandle}>
              Why does Hello need my school e-mail?
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default registerFormComp;
