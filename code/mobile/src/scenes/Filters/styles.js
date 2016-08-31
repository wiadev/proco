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
    position: 'relative',
    height,
    width,
    backgroundColor: '#f6f6f6',
  },
  btnSave: {
    color: 'rgb(71,71,71)',
    fontFamily: 'OpenSans',
    fontSize: 13,
    textAlign: 'center',
  },
  topMenuMid: {
    flex: 0,
    width: width * 50 / 100,
    position: 'relative',
    alignItems: 'center',
  },
  menuTitle: {
    color: 'rgb(249,54,95)',
    fontFamily: 'OpenSans',
    fontSize: 17,
    textAlign: 'center',
  },
  inputBox: {
    marginTop: 14,
    padding: 14,
    width,
    backgroundColor: 'white',
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dadbda',
  },
  inputBoxLeft: {
    flex: 1,
    alignItems: 'flex-start',
    width: width * 50 / 100,
  },
  inputBoxRight: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: width * 50 / 100,
    flexDirection: 'row',
  },
  pinkText: {
    fontFamily: 'OpenSans-Light',
    fontSize: 16,
    color: 'rgb(249,59,95)',
  },
  blackText: {
    fontFamily: 'OpenSans-Light',
    fontSize: 16,
    color: 'rgb(66,66,66)',
  },
  pinkHead: {
    backgroundColor: 'rgb(249,59,95)',
    padding: 14,
    width,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinkHeadText: {
    fontFamily: 'OpenSans-Light',
    fontSize: 13,
    color: 'white',
  },
});

export default styles;
