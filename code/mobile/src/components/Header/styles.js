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
    color: colors.primary1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    fontWeight: '500',
    color: colors.primaryAlt
  },
  textOnLightTheme: {
    color: colors.primary1
  },
  actorIcon: {
    fontSize: 24,
    color: colors.primaryAlt,
    backgroundColor: 'transparent'
  },
  actorIconOnLightTheme: {
    color: colors.primary1
  }
});

export default styles;
