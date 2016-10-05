import { StyleSheet } from 'react-native';

import colors from '../../core/style/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryAlt
  },
  buttonHighlighted: {
    backgroundColor: colors.primary1
  },
  textButton: {
    alignSelf: 'stretch',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20
  },
  imageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.primaryAlt
  },
  content: {
    color: colors.primary1
  },
  highlightedContent: {
    color: colors.primaryAlt
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  icon: {
    marginTop: 3,
    backgroundColor: 'transparent',
    fontSize: 34
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 4
  }
});

export default styles;
