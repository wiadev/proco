import {StyleSheet} from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  field: {
    paddingHorizontal: 16,
    backgroundColor: colors.primaryAlt,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray2,
    overflow: 'hidden'
  },
  singleRowField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54
  },
  multiRowField: {
    flexDirection: 'column',
    paddingVertical: 14,
  },
  multiRowFieldTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
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
  highlightedText: {
    color: colors.primary2
  },
  linkIcon: {
    color: colors.gray2,
    fontSize: 30
  },
  choiceIcon: {
    color: colors.primary2,
    fontSize: 24
  }
});

export default styles;
