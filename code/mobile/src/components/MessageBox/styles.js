import {
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  messageBox: {
    marginLeft: 20,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
  right: {
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 20,
  },
  chatScreenBox: {
    marginLeft: 0,
    marginRight: 0,
  },
  chatScreenrightBox: {
    backgroundColor: 'rgb(86,54,234)',
  },
  chatScreenrightBoxIcon: {
    backgroundColor: 'rgb(86,54,234)',
  },
  messageBoxText: {
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: 18,
    backgroundColor: '#F9365F',
    flex: -1,
    alignSelf: 'flex-start',
    minHeight: 5,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 20,
    paddingRight: 20,
    overflow: 'hidden',
    maxWidth: width * 80 / 100,
  },
  messageBoxArea: {
    backgroundColor: '#F9365F',
    flex: 1,
    alignSelf: 'flex-start',
    minHeight: 5,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 20,
    paddingRight: 20,
    overflow: 'hidden',
    maxWidth: width * 80 / 100,
  },
  reach: {
    flex: 1,
  },
  messagePrefixIcon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: -5,
  },
  lefticon: {
    left: -15,
    transform: [{
      rotateX: '180deg',
    }, {
      rotateZ: '180deg',
    }],
  },
  righticon: {
    right: -15,
  },
});

export default styles;