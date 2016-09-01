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
  headerDark: {
    backgroundColor: colors.primary1,
    borderBottomWidth: 0
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  column: {
    flex: 1
  },
  columnLeft: {
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  columnMiddle: {
    flex: 2
  },
  columnRight: {
    alignItems: 'flex-end',
    paddingRight: 10
  },
  title: {
    color: colors.primary1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textOnDarkTheme: {
    color: colors.primaryAlt
  },
  iconOnDarkTheme: {
    color: colors.primaryAlt
  }
});

export default styles;
