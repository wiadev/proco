import React, {Component} from "react";
import {StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity, TextInput} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconM from "react-native-vector-icons/MaterialIcons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
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
import appStyles from "../../../core/style";

const charMap = {ç: 'c', ö: 'o', ş: 's', ı: 'i', ü: 'u', ğ: 'g'};
const clearTurkishChars = (str) => {
  return str.toLocaleLowerCase().split('').filter(c => (c !== ' ')).map(c => charMap[c] || c).join('');
};

const width = Dimensions.get('window').width;

@connect(
  state => ({
    auth: state.auth,
    user: state.user,
  }),
)
export default class Register extends Component {

  constructor(props) {
    super(props);
    this.focusToEmail = this.focusToEmail.bind(this);
  }

  state = {
    network_email: '',
    birthday: '',
    isLoading: true,
  };

  componentWillReceiveProps(props) {
    this.checkLoaded(props);
  }

  componentWillMount() {
    this.checkLoaded(this.props);
  }

  checkLoaded({user: {first_name, birthday, network_email}} = this.props) {
    if (first_name) {
      if (!network_email) {
        this.setState({isLoading: false});
      }
    }
    this.setState({birthday: birthday, network_email: network_email});
  }

  focusToEmail() {
    this.refs.emailfield.focus();
  }

  onNext() {
    console.log("register", this.state);

    const {network_email, birthday, gender} = this.state;
    const {dispatch} = this.props;

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
        setImmediate(() => this.focusToEmail());
      }
    }];

    if (!network_email) {
      Actions.Card({
        label: "Your school email is missing",
        text: "Proco needs your school email to verify your school.",
        buttons,
        noClose: true,
      });
      return;
    }

    Validations.NetworkEmailValidation(network_email)
      .then((network_email) => {
        this.setState({isLoading: true});
        dispatch(updateUser('info', {
          birthday: moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          network_email: network_email.email,
        }));
      })
      .catch(e => {

        let label, text;
        switch (e) {
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
                setImmediate(() => this.focusToEmail());
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

  render() {

    const {user} = this.props;

    if (this.state.isLoading) {
      return <BlockerActivity />;
    }

    return (
      <View style={appStyles.container}>
        <Header
          title=""
          leftActorType="text"
          leftActor="Logout"
          leftAction={() => this.onLogout()}
          rightActorType="text"
          rightActor="Next"
          rightAction={() => this.onNext()}
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
                date={moment(this.state.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY')}
                onDateChange={(birthday) => {
                  this.setState({birthday});
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
                onChangeText={(network_email) => this.setState({network_email})}
                onSubmitEditing={::this.onNext}
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
