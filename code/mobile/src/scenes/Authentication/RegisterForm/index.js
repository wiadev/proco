import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  TouchableHighlight,
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
import { WHY_SCHOOL_EMAIL_PAGE } from '../../../core/StaticPages';
import {Actions} from 'react-native-router-flux';
import NetworkVerification from '../NetworkVerification';
import Header from '../../../components/Header';
import {CardModal} from '../../../components/Card';
import Picker from 'react-native-picker';
import { serverAction } from '../../../core/Api/actions';

import {styles, dpCustom} from './styles';

const width = Dimensions.get('window').width;

@connect(
  state => ({
    auth: state.auth,
    user: state.user,
  }),
)
class RegisterForm extends Component {

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
            <Icon
              name="angle-left"
              size={42}
              color="#FFFFFF"
              style={styles.leftButtonTextStyle}
              onPress={::this.onClickBack}
            />
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

        <TouchableHighlight onPress={() => Actions.WebViewModal(WHY_SCHOOL_EMAIL_PAGE)}>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Why does Proco need my school e-mail?
            </Text>
          </View>
        </TouchableHighlight>
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
          <CardModal
            show={this.state.showVerify}
            head="We'll need to verify your school e-mail."
            text="You can easily do that by either entering the code we\'ve just sent you by clicking the link in the e-mail you\'ve recieved."
            renderThis={() =>
              <NetworkVerification
                closer={() => this.setState({showVerify: false})}
                verify={(code) => console.log(code)}
              /> }
          />
      </View>
    );
  }
}

export default RegisterForm;
