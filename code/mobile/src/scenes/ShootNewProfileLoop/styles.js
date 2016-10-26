import {
  StyleSheet
} from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  shootNewProfileLoop: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end'
  },
  sparkle: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.primaryAlt
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray1
  },
  backButtonIcon: {
    color: colors.primaryAlt,
    fontSize: 18
  },
  cameraTypeSwitchButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray1
  },
  cameraTypeSwitchButtonIcon: {
    color: colors.primaryAlt,
    fontSize: 18
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  captureButtonContainer: {
    alignItems: 'center'
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.primaryAlt
  },
  captureButtonInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryAlt
  },
  previewButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  previewButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryAlt
  },
  previewButtonIcon: {
    backgroundColor: 'transparent',
    color: colors.primary1,
    fontSize: 24
  },
  profileLoop: {
    justifyContent: 'flex-end',
    paddingBottom: 12,
    paddingHorizontal: 20
  },
  // uploadIndicator: {
  //   paddingVertical: 6,
  //   paddingHorizontal: 10,
  //   backgroundColor: colors.primaryAlt,
  //   opacity: 0.6
  // },
});

export default styles;
