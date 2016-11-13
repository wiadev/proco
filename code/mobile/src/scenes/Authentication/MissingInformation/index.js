import React from 'react';
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity
} from 'react-native';
import DatePicker from "react-native-datepicker";
import moment from "moment";

import Text from '../../../components/Text';
import Button from '../../../components/Button';
import {styles, dpCustom} from './styles';

import { userOnboardingPostMissingInformation } from '../../../modules/user/onboarding';

@connect(
  state => ({
    isBirthdayMissing: state.userOnboarding.get('birthday_missing'),
    isGenderMissing: state.userOnboarding.get('gender_missing'),
  }),
)
export default class MissingInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      birthday: '01/01/1990',
      gender: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>We want to know you better</Text>

        {this._renderBirthdayFormGroup()}

        {this._renderGenderFormGroup()}

        <Button type="text" text="Continue" onPress={::this._onSubmit} highlight={true} style={styles.button} textStyle={styles.buttonTextStyle} />
      </View>
    );
  }

  _renderBirthdayFormGroup() {
    if (this.props.isBirthdayMissing) {
      const maxDate = moment().subtract(17, 'years').format('DD/MM/YYYY');

      return (
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>BIRTHDAY</Text>

          <DatePicker
            format="DD/MM/YYYY"
            maxDate={maxDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={null}
            customStyles={dpCustom}
            date={this.state.birthday}
            onDateChange={birthday => this.setState({birthday: birthday})}
          />
        </View>
      );
    }
  }

  _renderGenderFormGroup() {
    if (this.props.isGenderMissing) {
      return (
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>GENDER</Text>

          <View style={styles.genderPicker}>
            {this._renderGender('female')}

            {this._renderGender('male', 'last')}
          </View>
        </View>
      );
    }
  }

  _renderGender(gender, position=null) {
    let genderStyle = [styles.gender];
    let genderTextStyle = [styles.genderText];

    if (position === 'last') {
      genderStyle.push(styles.genderLast);
    }

    if (this.state.gender === gender) {
      genderStyle.push(styles.genderActive);
      genderTextStyle.push(styles.genderActiveText);
    }

    return (
      <TouchableOpacity onPress={() => this.setState({gender: gender})} activeOpacity={1} style={genderStyle}>
        <Text style={genderTextStyle}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</Text>
      </TouchableOpacity>
    );
  }

  _onSubmit() {
    let dataToPost = {};

    if (this.state.gender !== null) {
      dataToPost.gender = this.state.gender;
    }

    // FIXME: The component we used to get date is buggy (because of the timezone probably).
    // Since there is no easy fix or workaround for now, it is left intentionally.
    if (this.state.birthday != "") {
      dataToPost.birthday = moment(this.state.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD');
    }

    this.props.dispatch(userOnboardingPostMissingInformation(dataToPost));
  }
}
