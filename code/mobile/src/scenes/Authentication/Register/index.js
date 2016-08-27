import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {
  MKTextField,
} from 'react-native-material-kit';
import DatePicker from 'react-native-datepicker';
import {logout,updateNetworkEmail} from '../../../modules/Authentication/actions';
import {updateUser} from '../../../modules/User/actions';
import {connect} from 'react-redux';
import {Actions,ActionConst} from 'react-native-router-flux';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Picker from 'react-native-picker';

const charMap = {ç:'c',ö:'o',ş:'s',ı:'i',ü:'u',ğ:'g'};
const clearTurkishChars = (str) => {
  return str.toLocaleLowerCase().split('').filter(c => (c !== ' ')).map(c => charMap[c] || c).join('');
};

import {styles, dpCustom} from './styles';
import appStyles from '../../../core/style';

const width = Dimensions.get('window').width;

@connect(
  state => ({
    auth: state.auth,
    user: state.user,
  }),
)
export default class Register extends Component {

  static onRenderBackButton() {
    return (<Icon
      name="angle-left"
      size={42}
      color="#FFFFFF"
      style={styles.leftButtonTextStyle}
      onPress={RegisterForm.onClickBack}
    />);
  }

  constructor(props) {
    super(props);
    this.focusToEmail = this.focusToEmail.bind(this);
  }

  state = {
    email: '',
  };

  focusToEmail() {
    this.refs.emailfield.focus();
  }

  onRightClick() {
    this.props.dispatch(updateNetworkEmail(this.state.email, this.focusToEmail));
  }

  onClickBack() {

    Actions.Card({
      label: `Are you sure you want to login ${this.props.user.first_name}?`,
      text: 'If you are having trouble completing the form, please contact us.',
      buttons: [
        {
          text: "Contact",
          onPress: Actions.Contact,
        },
        {
          text: "Logout",
          onPress: () => {
            Actions.wrapper({
              type: 'CLEAN',
            });
            this.props.dispatch(logout());
          }
        }
      ]
    });

  }

  componentWillMount() {
    this.setState({email: this.props.user.email});
  }

  render() {

    const {user} = this.props;

    return (
      <View style={appStyles.container}>
        <Header
          leftIcon={'chevron-left'}
          leftAction={::this.onClickBack}
          rightContainer={
            <Text style={styles.btnNext} onPress={::this.onRightClick}>
              Next
            </Text>
          }
        />

        <View style={styles.infoBox}>
          <View style={styles.leftBox}>
            <IconM name="info-outline" size={42} color="#FFFFFF"/>
          </View>
          <View style={styles.rightBox}>
            <Text style={styles.rightBoxText}>
              Hello {this.props.user.first_name}.
            </Text>
            <Text style={styles.rightBoxText2}>
              to continue, we need you to complete this short form.
            </Text>
          </View>
        </View>
        <KeyboardAwareScrollView>
          <View>
            <View style={styles.bornBox}>
              <Text style={styles.emailLabel}>
                VERIFY WHEN YOU WERE BORN
              </Text>
              <DatePicker
                style={styles.datepicker}
                format="DD/MM/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={null}
                customStyles={dpCustom}
                date={user.birthday}
                onDateChange={(date) => {
                  this.setState({date});
                }}
              />
            </View>

              <View style={styles.emailBox}>
                <Text style={styles.emailLabel}>
                  SELECT YOUR UNIVERSITY
                </Text>
                <View style={styles.genderView}>
                  <Text
                    style={styles.genderText}
                    onPress={() => {
                      this.unipicker.toggle();
                    }}
                  >{this.state.uni || 'Please Select'}</Text>
                  <Icon
                    name="angle-right"
                    size={32}
                    color="rgba(255, 255, 255, 0.7)"
                    style={styles.genderIcon}
                  />
                </View>
              </View>

            { user.gender ? null : (
              <View style={styles.emailBox}>
                <Text style={styles.emailLabel}>
                  YOUR GENDER
                </Text>
                <View style={styles.genderView}>
                  <Text
                    style={styles.genderText}
                    onPress={() => {
                      this.picker.toggle();
                    }}
                  >{this.state.gender || 'Please Select'}</Text>
                  <Icon
                    name="angle-right"
                    size={32}
                    color="rgba(255, 255, 255, 0.7)"
                    style={styles.genderIcon}
                  />
                </View>
              </View>
            ) }

            <View style={styles.emailBox}>
              <Text style={styles.emailLabel}>
                WHAT IS YOUR UNIVERSITY E-MAIL?
              </Text>

              <MKTextField
                autoCapitalize={'none'}
                autoCorrect={false}
                tintColor={'transparent'}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                textInputStyle={styles.emailTxt}
                placeholder={clearTurkishChars(`${user.first_name}.${user.last_name}`) + `@university.edu`}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                style={styles.email}
                underlineEnabled={false}
                ref="emailfield"
                onChangeText={(email) => {
                  console.log("email", email);
                  this.setState({email});
                }}
                onSubmitEditing={::this.onRightClick}
              />
            </View>

            <TouchableOpacity onPress={Actions.AboutSchoolEmails}>
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Why do you need my university e-mail?
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
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
        <Picker
          ref={unipicker => this.unipicker = unipicker}
          style={{
            height: 250,
            width,
            left: 0,
            position: 'absolute',
            bottom: 0,
          }}
          showDuration={200}
          showMask={true}
          pickerData={['Bahcesehir University', 'Koc University']}
          selectedValue={'Bahcesehir University'}
          onPickerDone={(e) => {
            this.setState({
              uni: e[0],
            });
          }}
        />

      </View>
    );
  }
}