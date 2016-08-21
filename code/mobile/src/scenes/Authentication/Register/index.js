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
import {
  MKTextField,
} from 'react-native-material-kit';
import DatePicker from 'react-native-datepicker';
import {logout} from '../../../modules/Authentication/actions';
import {updateUser} from '../../../modules/User/actions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import NetworkVerification from '../NetworkVerification';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Picker from 'react-native-picker';
import { serverAction } from '../../../core/Api/actions';
import { NetworkEmailValidation } from '../../../core/common/Validations';

import {styles, dpCustom} from './styles';

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
  }

  state = {
    email: '',
    showVerify: false,
  };

  componentWillMount() {
    this.setState({email: this.props.user.first_name + '@proco.edu.tr'});
  }
  onRightClick() {

    let buttons = [{
      text: "Learn more",
      onPress: Actions.AboutSchoolEmails,
    }];

    if (!this.state.email) {
      Actions.Card({
        label: "Your school email is missing",
        text: "Proco needs your school email to verify your school.",
        buttons
      });
      return;
    }

    NetworkEmailValidation(this.state.email)
      .then((email) => {

        console.log("email", email);
      })
      .catch(e => {
        console.log("error", e);
        let label, text;
        switch (e) {
          case 'CHECK_EMAIL':
          case 'INVALID_EMAIL':
            label = "Something seems to be wrong with your email address";
            text = "It doesn't appear to be a valid school address.";
            buttons = [];
            break;
          case 'NETWORK_NOT_SUPPORTED':
            label = "Your school is not yet supported by Proco";
            text = "You can get in to the waiting list so we can let you know when you can use Proco at your school.";
            break;
          case 'COMMON_PROVIDER':
            label = "You have to give your school provided email addresses";
            text = "The one you've gave seems like personal one";
            break;
        }

        Actions.Card({
          label,
          text,
          buttons,
        });

      });

    return;
    this.props.dispatch(updateUser('info', this.state));
    this.props.dispatch(serverAction({
      type: 'USER_VERIFICATION',
      payload: {
        type: 'email',
        to: this.state.email,
      }
    }));
    this.setState({showVerify: true});
  }

  onClickBack() {

    Alert.alert(
      'Are you sure?',
      'Going back will log you off from your Facebook account.',
      [
        {
          text: 'I\'m sure.', onPress: () => {
          this.props.dispatch(logout());
        }
        },
        {text: 'Cancel', style: 'cancel'},
      ]
    );

  }


  render() {

    const {user} = this.props;

    return (
      <View style={styles.container}>
        <Header
          leftContainer={
            <Text style={styles.btnNext} onPress={::this.onRightClick}>
              Logout
            </Text>
          }
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
            WHAT IS YOUR SCHOOL E-MAIL?
          </Text>

          <MKTextField
            autoCapitalize={'none'}
            tintColor={'transparent'}
            textInputStyle={styles.emailTxt}
            placeholder="Please enter here"
            style={styles.email}
            underlineEnabled={false}
            placeholderTextColor={'white'}
            defaultValue={this.state.email}
            onTextChange={(email) => {
              this.setState({email});
            }}
          />
        </View>

        <TouchableOpacity onPress={() => {}}>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Why do you need my school e-mail?
            </Text>
          </View>
        </TouchableOpacity>
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
