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
    borderBottomWidth: 0
  },
  headerLight: {
    backgroundColor: colors.primaryAlt,
    borderBottomWidth: 1,
    borderColor: '#dadbda'
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    marginVertical: 8,
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
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  text: {
    color: colors.primaryAlt
  },
  textOnLightTheme: {
    color: colors.black
  },
  actorIcon: {
    fontSize: 24,
    color: colors.primaryAlt,
    backgroundColor: 'transparent'
  },
  actorIconOnLightTheme: {
    color: colors.black
  }
});

export default styles;
