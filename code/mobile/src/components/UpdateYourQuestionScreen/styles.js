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
  },
  backgroundImage: {
    position: 'absolute',
    height,
    width,
  },
  questionArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionImage: {
    marginBottom: 25,
  },
  questionLabel: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'OpenSans-Light',
    fontSize: 21,
    textAlign: 'center',
  },
  textBoxArea: {
    width,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 30,
  },
  textBoxInput: {
    fontFamily: 'OpenSans-Light',
  },
  textBoxLabel: {
    fontFamily: 'OpenSans-Light',
  },
  leftButtonTextStyle: {
    marginLeft: 10,
  },
});

export default styles;
