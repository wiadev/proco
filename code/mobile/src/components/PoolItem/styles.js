import {
  StyleSheet
} from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  poolItem: {
    flex: 1
  },
  poolItemContent: {
    flex: 0,
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 25,
    backgroundColor: colors.primaryAlt,
    overflow: 'hidden',
  },
  bottomButtonIcon: {
    alignSelf: 'center',
    color: '#F9365F' // FIXME: This color is not in our palette. Should be added to palette or replaced.
  }
});

export default styles;
