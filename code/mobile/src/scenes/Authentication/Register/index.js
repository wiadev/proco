import React from "react";
import {
  StatusBar,
  View,
  Text,
  KeyboardAvoidingView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {MKTextField} from "react-native-material-kit";
import DatePicker from "react-native-datepicker";
import {logout} from "../../../modules/Authentication/actions";
import {updateUser} from "../../../modules/User/actions";
import {Validations} from "../../../core/common";
import {connect} from "react-redux";
import moment from "moment";
import {Actions} from "react-native-router-flux";
import Header from "../../../components/Header";
import BlockerActivity from "../../../components/BlockerActivity";
import Picker from "react-native-picker";
import {styles, dpCustom} from "./styles";
import colors from '../../../core/style/colors';

const charMap = {ç: 'c', ö: 'o', ş: 's', ı: 'i', ü: 'u', ğ: 'g'};
const clearTurkishChars = (str) => {
  return str.toLocaleLowerCase().split('').filter(c => (c !== ' ')).map(c => charMap[c] || c).join('');
};

const statuses = {
  waiting: 'WAITING',
  ready: 'READY',
  submitted: 'SUBMITTED'
};

@connect(state => ({auth: state.auth, user: state.user, isUser: state.isUser}))
export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: statuses.waiting,
      network_email: '',
      birthday: ''
    };
  }

  componentWillReceiveProps(props) {
    this._setIsLoading(props);
  }

  componentWillMount() {
    this._setIsLoading(this.props);
  }

  render() {
    if (this.state.status !== statuses.ready) {
      return <BlockerActivity />;
    }

    return (
      <View style={styles.register}>
        <StatusBar hidden={false} />

        <Header
          theme="dark"
          titleType="logo"
          leftActorType="icon"
          leftActor="keyboard-arrow-left"
          leftAction={() => this.onLogout()}
          rightActorType="text"
          rightActor="Next"
          rightAction={() => this.onNext()}
        />

        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
          <View style={styles.infoBox}>
            <View style={styles.infoBoxIcon}>
              <Icon name="info-outline" size={42} color={colors.primaryAlt} />
            </View>

            <View style={styles.infoBoxContent}>
              <Text style={styles.infoBoxContentTitle}>
                Hello {this.props.user.first_name}.
              </Text>

              <Text style={styles.infoBoxDescription}>
                to continue, we need you to complete this short form.
              </Text>
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>VERIFY YOUR BIRTH DATE</Text>

              <DatePicker
                format="DD/MM/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={null}
                customStyles={dpCustom}
                date={moment(this.state.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY')}
                onDateChange={birthday => this.setState({birthday: moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD')})}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>SELECT YOUR UNIVERSITY</Text>

              <View style={styles.genderView}>
                <Text
                  style={styles.genderText}
                  onPress={() => this.university_picker.toggle()}
                >{this.state.uni || 'Please Select'}</Text>

                <Icon name="keyboard-arrow-right" size={32} color="rgba(255, 255, 255, 0.7)" style={styles.genderIcon} />
              </View>
            </View>

            { this.props.user.gender ? null : (
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>YOUR GENDER</Text>

                <View style={styles.genderView}>
                  <Text
                    style={styles.genderText}
                    onPress={() => this.picker.toggle()}
                  >{this.state.gender || 'Please Select'}</Text>

                  <Icon name="keyboard-arrow-right" size={32} color="rgba(255, 255, 255, 0.7)" style={styles.genderIcon}
                  />
                </View>
              </View>
            )}

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>TYPE YOUR UNIVERSITY EMAIL</Text>

              <MKTextField
                autoCapitalize={'none'}
                autoCorrect={false}
                tintColor={'transparent'}
                keyboardType={'email-address'}
                returnKeyType={'done'}
                textInputStyle={styles.emailTxt}
                placeholder={clearTurkishChars(`${this.props.user.first_name}.${this.props.user.last_name}`) + `@university.edu`}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                style={styles.email}
                underlineEnabled={false}
                ref="emailfield"
                onChangeText={(network_email) => this.setState({network_email})}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text onPress={Actions.AboutSchoolEmails} style={styles.footerText}>Why do you need my university e-mail?</Text>
          </View>

          <Picker
            ref={picker => this.picker = picker}
            style={{
              height: 250,
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
            ref={university_picker => {
              this.university_picker = university_picker;
            }}
            style={{
              height: 250,
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
        </KeyboardAvoidingView>
      </View>
    );
  }

  _setIsLoading(props) {
    if (props.user.first_name && this.state.status !== statuses.submitted) {
      this.setState({
        status: statuses.ready
      });
    }

    this.setState({
      birthday: props.user.birthday,
      network_email: props.user.network_email
    });
  }

  onNext() {
    this.setState({
      status: statuses.submitted
    });

    let buttons = [{
      text: "Learn more",
      onPress: () => {
        Actions.pop();
        setImmediate(() => {
          Actions.AboutSchoolEmails();
        });
      }
    }, {
      text: "Close",
      onPress: () => {
        Actions.pop();
      }
    }];

    if (!this.state.network_email) {
      Actions.Card({
        label: "Your school email is missing",
        text: "Proco needs your school email to verify your school.",
        buttons: buttons,
        noClose: true,
      });
      return;
    }

    Validations.NetworkEmailValidation(this.state.network_email)
      .then(network => {
        this.props.dispatch(updateUser('info', {
          birthday: this.state.birthday,
          network_email: network.email,
        }));
      })
      .catch(error => {
        this.setState({
          status: statuses.ready
        });

        let label, text;
        switch (error) {
          case 'CHECK_EMAIL':
          case 'INVALID_EMAIL':
            label = "Something seems to be wrong with your email address";
            text = "It doesn't appear to be a valid school address.";
            break;
          case 'ONLY_STUDENT':
            label = "Only student e-mails are accepted.";
            text = "Your university is a part of Proco but the e-mail you gave appears to be a staff address. Only students can use Proco for now.";
            break;
          case 'NETWORK_NOT_SUPPORTED':
            label = "Your university is not yet supported by Proco";
            text = "You can get in to the waiting list so we can let you know when you can use Proco at your school.";
            buttons = [{
              text: "Sounds good!",
              onPress: () => {
                Actions.pop();
              }
            }];
            break;
          case 'COMMON_PROVIDER':
            label = "You have to give your university provided email addresses";
            text = "The one you've gave seems like personal one";
            break;
        }

        Actions.Card({
          label,
          text,
          buttons,
          noClose: true
        });
      });
  }

  onLogout() {
    Actions.Card({
      label: `Are you sure you want to logout ${this.props.user.first_name}?`,
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
}
