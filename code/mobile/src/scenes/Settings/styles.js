import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  preview: {
    position: 'relative',
    height,
    width,
    backgroundColor: '#f6f6f6',
  },
  container: {
    paddingTop: 65,
  },
  topMenuMid: {
    flex: 0,
    width: width * 50 / 100,
    position: 'relative',
    alignItems: 'center',
  },
  menuTitle: {
    color: 'rgb(249,54,95)',
    fontFamily: 'Montserrat-Regular',
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
    width: (width * 50 / 100) - 28,
  },
  inputBoxRight: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: (width * 50 / 100) - 28,
    flexDirection: 'row',
  },
  pinkText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
    color: 'rgb(249,59,95)',
  },
  blackText: {
    fontFamily: 'Montserrat-Light',
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
    fontFamily: 'Montserrat-Light',
    fontSize: 13,
    color: 'white',
  },
  mkSwitch: {
    position: 'relative',
    alignSelf: 'flex-end',
    height: 55,
    top: 15,
    marginRight: 0,
  },
  mkSwitch2: {
    alignSelf: 'flex-end',
    height: 25,
    top: -5,
    marginRight: 0,
    position: 'relative',
  },
  underMessage: {
    fontFamily: 'Montserrat-Light',
    fontSize: 12,
    color: 'rgb(135, 129, 129)',
    padding: 5,
    paddingLeft: 10,
  },
  appLogoBottom: {
    width,
    justifyContent: 'center',
    padding: 30,
    alignItems: 'center',
  },
  companyLogoBottom: {
    width,
    justifyContent: 'center',
    padding: 30,
    alignItems: 'center',
  },
  companyLogoBottomText: {
    color: '#2d2d2d',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Light',
  },
  scrollView: {
    marginTop: 10,
    width: width - 20,
    marginBottom: 10,
    height: 70,
  },
  avatar: {
    height: 60,
    width: 60,
    margin: 0,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
    marginLeft: 5,
  },
  avatarImage: {
    width: 60,
    height: 60,
    margin: 0,
  },
});

export default styles;
