import {
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';

import { getCorrectFontSizeForScreen } from '../../../core/functions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const popupWidth = width * 80 / 100;
const popupHeight = height * 80 / 100;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:"transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    position: 'absolute',
    width,
    height,
    top: 0,
    left: 0,
  },
  blurView: {
    position: 'relative',
    flex: 1,
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupInside: {
    flex: 0,
    padding: 10,
    paddingTop: 5,
    alignItems: 'center',
  },
  password: {
    borderWidth: 0,
    width: 150,
  },
  passwordArea: {},
  passwordTxt: {
    fontFamily: 'Montserrat-Light',
    color: 'rgb(5,5,6)',
    fontSize: 26,
    marginTop: 15,
    height: 50,
    marginBottom: 15,
    textAlign: 'center',
  },
  headText: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgb(51,205,153)',
    fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 18),
    marginTop: 5,
    alignSelf: 'center',
    textAlign: 'center',
  },
  descriptionText: {
    fontFamily: 'Montserrat-Light',
    color: 'rgb(82,93,103)',
    fontSize: 14,
    marginTop: 15,
    alignSelf: 'center',
    textAlign: 'center',
  },
  verifyButton: {
    borderRadius: 50,
    backgroundColor: 'rgb(51,205,153)',
    width: popupWidth * 80 / 100,
    height: 50,
    justifyContent: 'center',
    padding: 10,
  },

  backBtn: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'auto',
    borderWidth: 1,
    borderColor: '#fa3f6a',
    marginRight: 15,
  },
  resendBtn: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: '#fa3f6a',
    height: 50,
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'auto',
  },
  verifyButtonTxt: {
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    textAlign: 'center',
    fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 16),
  },
  error: {
    fontFamily: 'Montserrat-Regular',
    color: 'red',
    textAlign: 'center',
    fontSize: 12,
    opacity: 0,
  },
  image: {
    height: height * 0.3,
  },
});

export default styles;
