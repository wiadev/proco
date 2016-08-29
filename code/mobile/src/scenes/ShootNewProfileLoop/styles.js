import {
  StyleSheet
} from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  shootNewProfileLoop: {
    flex: 1
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    height: null,
    width: null,
    paddingBottom: 12,
    paddingHorizontal: 20
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  profileLoop: {
    justifyContent: 'flex-end',
    paddingBottom: 12,
    paddingHorizontal: 20
  }
});

export default styles;
