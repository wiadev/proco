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
  closeButtonContainer: {
    flexDirection: 'row',
    marginLeft: 6,
    marginTop: 6,
  },
  closeButton: {
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    fontSize: 36,
    color: colors.primaryAlt
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
  },
  inputBubble: {
    marginHorizontal: 10
  }
});

export default styles;
