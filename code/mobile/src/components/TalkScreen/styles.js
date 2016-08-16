import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  preview: {
    position: 'relative',
    height,
    width,
    backgroundColor: '#ffffff',
  },
  topMenu: {
    paddingTop: 20,
    height: 65,
    width,
    backgroundColor: 'white',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 0.5,
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
  },
  topMenuLeft: {
    flex: 0,
    width: width * 25 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  topMenuRight: {
    flex: 0,
    width: width * 25 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  btnSave: {
    color: 'rgb(71,71,71)',
    fontFamily: 'Montserrat-Regular',
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
    fontFamily: 'Montserrat-Regular',
    fontSize: 17,
    textAlign: 'center',
  },
  rowItem: {
    width: width * 70 / 100,
    backgroundColor: 'white',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rowItemLeft: {
    flex: 0,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  rowItemImage: {
    height: 34,
    width: 34,
    margin: 0,
    borderRadius: 28,
    borderWidth: 0,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 34,
    height: 34,
    margin: 0,
  },
  rowItemUsername: {
    fontSize: 16,
    color: 'rgb(249,54,95)',
    fontFamily: 'Montserrat-Regular',
  },
  rowItemUserTitle: {
    fontSize: 12,
    color: 'rgb(139,139,139)',
    fontFamily: 'Montserrat-Light',
  },
  rowItemSecond: {
    marginLeft: 10,
    marginTop: -3,
  },
});

export const messengerStyle = {
  sendButton: {
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    backgroundColor: 'rgb(86,54,234)',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 5,
    width: 90,
  },
  bubbleRight: {
    backgroundColor: 'transparent',
    marginLeft: 0,
  },
  bubbleLeft: {
    backgroundColor: 'transparent',
    marginRight: 0,
  },
  textLeft: {
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
    color: 'white',
  },
  textRight: {
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
    color: 'white',
  },
};


export default styles;
