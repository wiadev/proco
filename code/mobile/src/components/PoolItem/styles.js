import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import colors from '../../core/style/colors';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  poolItem: {
    width,
    height,
  },
  poolItemContent: {
    flex: 0,
    justifyContent: 'space-between',
    padding: 10
  },
  displeaseButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  displeaseButtonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: colors.gray1,
    opacity: 0.4
  },
  displeaseButtonIcon: {
    backgroundColor: 'transparent',
    color: colors.primaryAlt,
    fontSize: 14
  },
  actionButtonContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  nonTopBubble: {
    marginTop: 10
  }
});

export default styles;
