import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
  ListView,
  Image,
  TouchableHighlight,
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
  rowItem: {
    width,
    backgroundColor: 'white',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: 'rgb(222,222,222)',
    borderBottomWidth: 1,
  },
  rowItemLeft: {
    flex: 0,
    width: width * 35 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  rowItemRight: {
    flex: 0,
    width: width * 15 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  rowItemImage: {
    height: 56,
    width: 56,
    margin: 0,
    borderRadius: 28,
    borderWidth: 0,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 56,
    height: 56,
    margin: 0,
  },
  listView: {
    flex: 0,
    width,
    flexDirection: 'row',
  },
  rowItemUsername: {
    fontSize: 18,
    color: 'rgb(22,20,23)',
    fontFamily: 'OpenSans',
  },
  rowItemUserTitle: {
    fontSize: 12,
    color: 'rgb(139,139,139)',
    fontFamily: 'OpenSans-Light',
  },
});

export default styles;
