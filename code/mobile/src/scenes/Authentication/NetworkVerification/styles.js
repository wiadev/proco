import { StyleSheet } from 'react-native';

import colors from '../../../core/style/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slide: {
    flex: 1,
    justifyContent: 'center'
  },
  slideSticksToTop: {
    justifyContent: 'flex-start'
  },
  topImage: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginBottom: 10
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center'
  },
  formTitle: {
    color: colors.success,
  },
  errorTitle: {
    color: colors.danger
  },
  loadingTitle: {
    color: colors.success
  },
  formGroup: {
    paddingVertical: 20
  },
  formLabel: {
    fontSize: 14
  },
  formInput: {
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
  loadingIndicator: {
    marginBottom: 40
  }
});

export default styles;
