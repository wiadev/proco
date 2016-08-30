import { StyleSheet } from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  updateYourQuestion: {
    flex: 1,
    backgroundColor: colors.primary1
  },
  profileLoop: {
    opacity: 1
  },
  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  closeButton: {
    marginLeft: 6,
    marginTop: 6
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10
  }
});

export default styles;
