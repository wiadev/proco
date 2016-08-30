import {
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { getCorrectFontSizeForScreen } from '../../core/functions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    position: 'relative',
    height,
    width,
  },
  backgroundImage: {
    position: 'absolute',
    height,
    width,
    flex: 1,
  },
  answerButton: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 15,
    right: 20,
    borderRadius: 100,
  },
  answerIcon: {
    top: 13,
    left: -15,
    backgroundColor: 'transparent',
    transform: [{
      rotateY: '180deg',
    }],
  },
  messageList: {
    backgroundColor: 'transparent',
    flex: 0,
    height: 300,
    position: 'absolute',
    bottom: 100,
    justifyContent: 'flex-end',
    width,
  },
  topScreenMessageIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  menuList: {
    position: 'relative',
    top: height * 0.52,
  },
  menuItem: {
    marginBottom: 30,
  },
  menuItemText: {
    color: 'white',
    fontFamily: 'OpenSans-Light',
    fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 20),
    textAlign: 'center',
  },
  avatar: {
    left: width / 2 - 80,
    height: 160,
    width: 160,
    margin: 0,
    position: 'absolute',
    top: height * 0.175,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 160,
    height: 160,
    margin: 0,
  },
});


export default styles;
