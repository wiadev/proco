import { StyleSheet } from 'react-native';

import colors from '../../../core/style/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: colors.success,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center'
  },
  formGroup: {
    paddingVertical: 20
  },
  formLabel: {
    fontSize: 14
  },
  formInput: {
    color: colors.primary1,
    fontSize: 26,
    height: 35,
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.success
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: "600"
  },
  genderPicker: {
    flexDirection: 'row'
  },
  gender: {
    flex: 1,
    marginVertical: 10,
    paddingVertical: 10,
  },
  genderActive: {
    backgroundColor: colors.success
  },
  genderText: {
    fontSize: 18,
    textAlign: 'center'
  },
  genderActiveText: {
    color: colors.primaryAlt
  }
});

export const dpCustom = StyleSheet.create({
  dateIcon: {
    width: 0,
    height: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  dateInput: {
    borderWidth: 0,
    borderColor: 'transparent',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  dateText: {
    fontFamily: 'CenturyGothic',
    fontSize: 26,
  },
  dateTouchBody: {
    height: 50
  }
});
