import {
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { getCorrectFontSizeForScreen } from './../../core/functions';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7A36AD',
    opacity: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignSelf: 'stretch',
    height,
  },
  swiper: {
    height: 231,
  },
  swiperText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  swiperIcon: {
    marginBottom: 28,
    height: 107,
  },
  swiperDot: {
    backgroundColor: 'transparent',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
  },
  swiperActiveDot: {
    backgroundColor: 'transparent',
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 7,
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
  },
  swiperActiveDotChild: {
    backgroundColor: '#fff',
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  swiperPagination: {
    bottom: 15,
  },
  footerText: {
    fontSize: 10,
    color: 'white',
    paddingBottom: 15,
    textAlign: 'center',
    backgroundColor: 'transparent',
    width: width * 0.9,
    fontFamily: 'OpenSans-Light',
    lineHeight: 15,
  },
  text: {
    fontFamily: 'OpenSans-Light',
    fontSize: 21,
    color: 'white',
  },
  logo: {
    marginBottom: 25,
    marginTop: 75,
    height: 100,
  },
  fbLogin: {
    opacity: 0,
    backgroundColor: 'red',
    width: 340,
    height: 65,
  },
  fbLoginView: {
    backgroundColor: 'white',
    width: width * 90 / 100,
    height: 45,
    justifyContent: 'center',
    borderRadius: 50,
    paddingTop: 60,
    bottom: 50,
  },
  fbLoginText: {
    color: '#3B5998',
    backgroundColor: 'transparent',
    fontSize: getCorrectFontSizeForScreen(PixelRatio, width, height, 16),
    fontFamily: 'OpenSans',
    textAlign: 'center',
    top: -50,
    lineHeight: 30,
    left: 20,
  },
  fbLoginIcon: {
    backgroundColor: 'transparent',
    top: -17,
    left: getCorrectFontSizeForScreen(PixelRatio, width, height, 30),
  },
  authLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -25,
  },
});
export default styles;
