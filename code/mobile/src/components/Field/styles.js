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
  text: {
    color: colors.gray1,
    fontSize: 16
  }
});

export default styles;
