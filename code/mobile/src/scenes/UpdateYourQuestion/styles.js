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
    flex: 1
  },
  closeButton: {
    marginLeft: 6,
    marginTop: 6
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryAlt
  },
  secondaryButtonIcon: {
    backgroundColor: 'transparent',
    color: colors.primary1
  }
});

export default styles;
