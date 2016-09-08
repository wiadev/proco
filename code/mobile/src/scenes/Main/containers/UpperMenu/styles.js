import {StyleSheet} from 'react-native';

import colors from '../../../../core/style/colors';

const styles = StyleSheet.create({
  upperMenu: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  backgroundLinearGradient: {
    flex: 1
  },
  avatarRow: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 160,
    height: 160,
    marginBottom: 40,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: colors.primaryAlt
  },
  menuRow: {
    flex: 2,
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
  bottomArrowRow: {
    paddingBottom: 20
  },
  bottomArrowIcon: {
    color: colors.primaryAlt,
    fontSize: 44,
    textAlign: 'center'
  }
});

export default styles;
