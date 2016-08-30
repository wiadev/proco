import {
  StyleSheet,
} from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    paddingTop: 20,
    backgroundColor: colors.primaryAlt,
    borderBottomWidth: 1,
    borderColor: '#dadbda'
  },
  column: {
    flex: 1
  },
  columnLeft: {
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  columnMiddle: {
    flex: 2,
    alignItems: 'center'
  },
  columnRight: {
    alignItems: 'flex-end',
    paddingRight: 10
  },
  title: {
    color: colors.primary1,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default styles;
