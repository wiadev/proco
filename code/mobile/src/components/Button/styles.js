import { StyleSheet } from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 20,
    width: 230,
    marginTop: 40,
  },
  buttonDanger: {
    backgroundColor: colors.danger
  },
  buttonWarning: {
    backgroundColor: colors.warning
  },
  buttonSuccess: {
    backgroundColor: colors.success
  },
  buttonInfo: {
    backgroundColor: colors.info
  },
  buttonText: {
    color: 'rgb(249, 54, 95)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextWhite: {
    color: '#fff'
  }
});

export default styles;
