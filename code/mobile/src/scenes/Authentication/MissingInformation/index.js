import React from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import DatePicker from "react-native-datepicker";
import moment from "moment";

import Text from '../../../components/Text';
import Button from '../../../components/Button';
import {styles, dpCustom} from './styles';

export default class MissingInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      birthday: '1990-01-01',
      gender: null,
      missingInformation: ['birthday', 'gender']
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
    if (this.state.missingInformation.indexOf('birthday') !== -1) {
      return (
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>BIRTHDAY</Text>

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
      );
    }
  }

  _renderGenderFormGroup() {
    if (this.state.missingInformation.indexOf('gender') !== -1) {
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
    // hellooooo, is it meee you're looking foor?
  }
}
