import { StyleSheet } from 'react-native';

import colors from '../../../core/style/colors';

const dimmedWhite = 'rgba(255, 255, 255, 0.5)';

export const styles = StyleSheet.create({
  register: {
    flex: 1,
    backgroundColor: colors.primary1
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
    paddingVertical: 10
  },
  infoBoxIconContainer: {
    flex: 1,
    alignItems: 'center'
  },
  infoBoxIcon: {
    fontSize: 42,
    color: colors.primaryAlt
  },
  infoBoxContent: {
    flex: 4,
    paddingRight: 10
  },
  infoBoxContentTitle: {
    color: colors.primaryAlt,
    fontSize: 16,
  },
  infoBoxDescription: {
    color: dimmedWhite,
    fontSize: 13,
    paddingTop: 3,
  },
  form: {

  },
  formGroup: {
    padding: 20
  },
  formLabel: {
    color: dimmedWhite,
    fontSize: 11
  },
  footer: {
    marginTop: 50
  },
  footerText: {
    color: dimmedWhite,
    fontSize: 11,
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  email: {
    borderWidth: 0,
  },
  emailTxt: {
    fontWeight: 'normal',
    color: 'white',
    fontSize: 26,
    height: 35,
    marginTop: 10,
  },
  genderView: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  genderText: {
    fontSize: 26,
    height: 35,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  genderIcon: {
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'transparent',
    top: 10,
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
    color: colors.primaryAlt,
    fontSize: 26,
  },
  dateTouchBody: {
    height: 50
  }
});
