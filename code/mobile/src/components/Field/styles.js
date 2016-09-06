import {StyleSheet} from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    paddingHorizontal: 16,
    backgroundColor: colors.primaryAlt,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray2
  },
  stickToPrevious: {
    position: 'relative',
    top: -1,
    marginBottom: -1
  },
  text: {
    color: colors.gray1,
    fontSize: 15 // I always use even numbers for this kind of stuff, but this is really the best option here. -G
  },
  linkIcon: {
    marginRight: -14,
    color: colors.gray1,
    fontSize: 36,
    textAlign: 'right'
  }
});

export default styles;
