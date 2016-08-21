import {
  StyleSheet
} from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  poolItem: {
    flex: 1
  },
  poolItemBackground: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  poolItemContent: {
    flex: 0,
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  actionButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 25,
    backgroundColor: colors.primaryAlt,
    overflow: 'hidden',
  },
  actionButtonIcon: {
    alignSelf: 'center',
    color: '#F9365F' // TODO: This color is not in our palette. Should be added to palette or replaced.
  }
});

export default styles;
