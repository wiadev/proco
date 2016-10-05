import { StyleSheet } from 'react-native';

import colors from '../../core/style/colors';

const paddingHorizontal = 20;
export const colorSet = {
  left: {
    bg: colors.primary1,
    fg: colors.primaryAlt
  },
  right: {
    bg: colors.gray,
    fg: colors.black
  },
  alt: {
    bg: colors.primaryAlt,
    fg: colors.primary1
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: 0,
    paddingVertical: 8,
    paddingHorizontal: paddingHorizontal,
    borderRadius: 20
  },
  containerLeft: {
    alignSelf: 'flex-start',
    backgroundColor: colorSet.left.bg
  },
  containerRight: {
    alignSelf: 'flex-end',
    backgroundColor: colorSet.right.bg
  },
  containerAlt: {
    backgroundColor: colorSet.alt.bg
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
    borderTopColor: colorSet.left.bg,
    transform: [
      {rotate: '50deg'}
    ]
  },
  tailRight: {
    right: -2,
    borderTopColor: colorSet.right.bg,
    transform: [
      {rotate: '310deg'}
    ]
  },
  tailAlt: {
    borderTopColor: colorSet.alt.bg
  },
  content: {
    fontSize: 14
  },
  contentSmall: {
    fontSize: 12
  },
  contentBig: {
    fontSize: 18
  },
  contentLeft: {
    color: colorSet.left.fg
  },
  contentRight: {
    color: colorSet.right.fg
  },
  contentAlt: {
    color: colorSet.alt.fg
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
    fontFamily: 'SF UI Display'
  }
});

export default styles;
