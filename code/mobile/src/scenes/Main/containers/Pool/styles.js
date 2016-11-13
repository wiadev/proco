import {StyleSheet,} from 'react-native';

import colors from '../../../../core/style/colors';

const styles = StyleSheet.create({
  pool: {
    flex: 1,
  },
  poolItemO: {

  },
  messageIconWrapper: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  upperMenuIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // horizontal margin is for not covering those areas, there may be some buttons or such.
    marginHorizontal: 100,
    color: colors.primaryAlt,
    fontSize: 44,
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
});

export default styles;
