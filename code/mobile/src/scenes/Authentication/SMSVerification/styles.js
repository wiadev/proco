import {
  StyleSheet
} from 'react-native';

import colors from '../../../core/style/colors';

const styles = StyleSheet.create({
  SMSVerification: {
    flex: 1,
    backgroundColor: colors.primary1,
    paddingHorizontal: 30
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    color: colors.primaryAlt
  },
  title: {
    marginBottom: 16,
    fontSize: 28
  },
  description: {
    fontSize: 16,
    fontWeight: '100'
  },
  error: {
    marginTop: 10,
    color: colors.danger
  },
  input: {
    alignSelf: 'center',
    width: 160,
    height: 40,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 24,
    color: colors.primaryAlt,
    fontFamily: "Menlo-Bold" // TODO: This font is available only on iOS. Need to apply a cross platform solution for android.
  },
  activityIndicator: {
    marginTop: 20
  }
});

export default styles;
