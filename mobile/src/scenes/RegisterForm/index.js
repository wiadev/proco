import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {
  MKTextField,
} from 'react-native-material-kit';
import DatePicker from 'react-native-datepicker';
import { logout } from '../../modules/Authentication/actions';
import { updateUser } from '../../modules/User/actions';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Picker from 'react-native-picker';
import NetworkVerificationModal from './NetworkVerificationModal';

import { styles, dpCustom } from './styles';

const width = Dimensions.get('window').width;

@connect(
  state => ({
    auth: state.auth,
    user: state.user,
  }),
)
class RegisterForm extends Component {
  static getStyles() {
    return styles;
  }

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
    this.styles = styles;
  }

  state = {
    email: '',
    gender: null,
    showVerify: false,
  };

  onRightClick() {
    this.props.dispatch(updateUser(this.state));
  }

  onClickBack() {

    Alert.alert(
      'Are you sure?',
      'Going back will log you off from your Facebook account.',
      [
        {text: 'I\'m sure.', onPress: () => {
          this.props.dispatch(logout());
        }},
        {text: 'Cancel', style: 'cancel'},
      ]
    );

  }

  onClickVerify() {

    /*
    verification
     */
  }

  render() {

    const { user } = this.props;

    return (
      <View style={this.styles.container}>
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
              <IconM name="info-outline" size={42} color="#FFFFFF" />
            </View>
            <View style={this.styles.rightBox}>
              <Text style={this.styles.rightBoxText}>
                Hello {this.props.user.get('first_name')}.
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
              date={user.get('birthday')}
              onDateChange={(date) => { this.setState({ date }); }}
            />
          </View>

          { user.get('gender') ? null : (
            <View style={this.styles.emailBox}>
            <Text style={this.styles.emailLabel}>
              YOUR GENDER
            </Text>
            <View style={this.styles.genderView}>
              <Text
                style={this.styles.genderText}
                onPress={() => { this.picker.toggle(); }}
              >{this.state.gender || 'Please Select'}</Text>
              <Icon
                name="angle-right"
                size={32}
                color="rgba(255, 255, 255, 0.7)"
                style={this.styles.genderIcon}
              />
            </View>
          </View>
          ) }


          <View style={this.styles.emailBox}>
            <Text style={this.styles.emailLabel}>
              WHAT IS YOUR SCHOOL E-MAIL?
            </Text>
            <MKTextField
              tintColor={'transparent'}
              textInputStyle={this.styles.emailTxt}
              placeholder="Please enter here"
              style={this.styles.email}
              underlineEnabled={false}
              placeholderTextColor={'white'}
              defaultValue={this.props.auth.get('first_name') + '@proco.edu.tr'}
              onTextChange={(email) => { this.setState({ email }); }}
            />
          </View>

          <View style={this.styles.footer}>
            <Text style={this.styles.footerText} onPress={this.onPressHandle}>
              Why does Hello need my school e-mail?
            </Text>
          </View>
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
          {this.state.showVerify ? (
            <MailVerifyModalComp onVerifyClick={this.onClickVerify} />
          ) : null}
      </View>
    );
  }
}

export default RegisterForm;
