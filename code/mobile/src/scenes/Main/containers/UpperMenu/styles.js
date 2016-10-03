import {StyleSheet} from 'react-native';

import colors from '../../../../core/style/colors';

const styles = StyleSheet.create({
  logoRow: {
    flex: 1.2,
    flexDirection: 'row'
  },
  logoSideCushion: {
    flex: 1
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  avatarRow: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: colors.primaryAlt
  },
  menuRow: {
    flex: 3,
    alignItems: 'center'
  },
  menuItem: {
    flex: 1
  },
  menuItemText: {
    color: colors.primaryAlt,
    fontSize: 22,
    fontWeight: "300",
    opacity: 0.9
  },
  bottomArrowIcon: {
    backgroundColor: 'transparent',
    color: colors.primaryAlt,
    fontSize: 32,
    textAlign: 'center'
  }
});

export default styles;
