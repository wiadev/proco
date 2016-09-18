import { StyleSheet } from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.primary1
  },
  container: {
    alignSelf: 'center',
    marginHorizontal: 20
  },
  activityIndicator: {
    marginBottom: 20
  },
  label: {
    color: colors.primaryAlt,
    fontSize: 28,
    textAlign: 'center'
  },
  text: {
    marginTop: 10,
    color: colors.primaryAlt,
    fontSize: 16,
    fontWeight: "300",
    textAlign: 'center'
  },
  buttonList: {
    marginTop: 35
  }
});

export default styles;
