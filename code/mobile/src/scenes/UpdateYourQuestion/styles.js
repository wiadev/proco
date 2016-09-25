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
    position: 'relative',
    flex: 1
  },
  // FIXME: Overlay style (paddingTop) is hardcoded, need to find a way to vertically center content in a responsive way.
  overlay: {
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingTop: 100,
    backgroundColor: colors.dimPrimary1,
  },
  overlayImage: {
    resizeMode: 'contain'
  },
  overlayText: {
    color: colors.primary2,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600'
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
