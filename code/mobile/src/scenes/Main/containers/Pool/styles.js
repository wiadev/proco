import {StyleSheet} from 'react-native';

import colors from '../../../../core/style/colors';

const styles = StyleSheet.create({
  pool: {
    flex: 1,
    backgroundColor: 'black',
  },
  messageIconWrapper: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  upperMenuIcon: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    color: colors.primaryAlt,
    fontSize: 44,
    textAlign: 'center'
  }
});

export default styles;
