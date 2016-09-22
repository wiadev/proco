import {StyleSheet} from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  matchNotification: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary1
  },
  container: {
    alignItems: 'center'
  },
  avatarContainer: {
    marginVertical: 10
  },
  text: {
    color: colors.primaryAlt,
    textAlign: 'center'
  },
  title: {
    fontSize: 20
  },
  buttons: {
    marginTop: 10
  }
});

export default styles;
