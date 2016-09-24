import { StyleSheet } from 'react-native';

import colors from '../../core/style/colors';

const paddingHorizontal = 20;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: 0,
    paddingVertical: 12,
    paddingHorizontal: paddingHorizontal,
    borderRadius: 20
  },
  containerLeft: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary2
  },
  containerRight: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primaryAlt
  },
  containerForMultilineInput: {
    paddingVertical: 0
  },
  textInputMultiLine: {
    paddingTop: 4,
    paddingBottom: 8,
  },
  tail: {
    position: 'absolute',
    bottom: -5,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 25,
    borderLeftColor: 'transparent',
    borderLeftWidth: 10,
    borderRightColor: 'transparent',
    borderRightWidth: 10
  },
  tailLeft: {
    left: -2,
    borderTopColor: colors.primary2,
    transform: [
      {rotate: '50deg'}
    ]
  },
  tailRight: {
    right: -2,
    borderTopColor: colors.primaryAlt,
    transform: [
      {rotate: '310deg'}
    ]
  },
  content: {
    fontSize: 14
  },
  contentLeft: {
    color: colors.primaryAlt
  },
  contentRight: {
    color: colors.primary1
  },
  // text
  text: {
    color: colors.primary1
  },
  // input
  sizeHandlerText: {
    position: 'relative',
    bottom: -1,
    height: 1,
    opacity: 0,
    paddingHorizontal: paddingHorizontal + 12,
  },
  textInput: {
    color: colors.primary1
  }
});

export default styles;
