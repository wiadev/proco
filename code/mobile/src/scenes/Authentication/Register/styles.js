import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7A36AD',
    opacity: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignSelf: 'stretch',
    height,
  },
  navBar: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  leftButtonTextStyle: {
    backgroundColor: 'transparent',
    color: 'white',
    width: 30,
  },
  logo: {
    alignSelf: 'center',
    flex: 0,
    top: 8,
    left: -5,
    height: 75
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'flex-start',
    paddingTop: 4,
    height: 80,
    flexDirection: 'row',
    top: 30,
  },
  leftBox: {
    width: width * 0.2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 2,
    paddingTop: 9,
  },
  rightBox: {
    alignSelf: 'auto',
    width: width * 0.8,
    paddingRight: 5,
    paddingTop: 9,
  },
  rightBoxText: {
    fontFamily: 'OpenSans',
    color: 'white',
    fontSize: 16,
  },
  rightBoxText2: {
    fontFamily: 'OpenSans-Light',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
    paddingTop: 3,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    bottom: -50,
    alignItems: 'center',
    width,
  },
  footerText: {
    fontFamily: 'OpenSans-Light',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
  },
  email: {
    borderWidth: 0,
  },
  emailLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
    fontFamily: 'OpenSans',
    fontSize: 11,
  },
  emailTxt: {
    fontFamily: 'OpenSans-Light',
    color: 'white',
    fontSize: 26,
    height: 35,
    marginTop: 10,
    width,
  },
  datepicker: {
    width,
  },
  bornBox: {
    marginTop: 60,
    paddingLeft: 20,
  },
  emailBox: {
    marginTop: 32,
    paddingLeft: 20,
  },
  btnNext: {
    color: 'white',
    fontFamily: 'OpenSans',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  header: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 50,
    width,
  },
  genderView: {
    width,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  genderText: {
    fontFamily: 'OpenSans-Light',
    color: 'white',
    fontSize: 26,
    height: 35,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  genderIcon: {
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'transparent',
    top: 10,
  },
});

export const dpCustom = StyleSheet.create({
  dateIcon: {
    width: 0,
    height: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  dateInput: {
    flex: 1,
    height: 35,
    borderWidth: 0,
    borderColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  dateText: {
    fontFamily: 'OpenSans-Light',
    color: 'white',
    fontSize: 26,
  },
  dateTouchBody: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
