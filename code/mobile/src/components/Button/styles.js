import { StyleSheet } from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    marginTop: 5,
    padding: 12,
    backgroundColor: colors.primaryAlt,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary1,
  },
  buttonDanger: {
    backgroundColor: colors.danger,
    borderColor: colors.danger
  },
  buttonWarning: {
    backgroundColor: colors.warning,
    borderColor: colors.warning
  },
  buttonSuccess: {
    backgroundColor: colors.success,
    borderColor: colors.success
  },
  buttonInfo: {
    backgroundColor: colors.info,
    borderColor: colors.info
  },
  buttonText: {
    color: colors.primary1,
    fontFamily: 'OpenSans',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextWhite: {
    color: colors.primaryAlt
  }
});

export default styles;
