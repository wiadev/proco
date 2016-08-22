import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const cardWidth = width * 80 / 100;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height,
    width,
    backgroundColor: 'rgba(120,55,175, 0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    height,
    width,
  },
  innner: {
    width: cardWidth,
  },
  permissionImage: {
    marginBottom: 25,
  },
  label: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'OpenSans',
    fontSize: 28,
    textAlign: 'center',
  },
  text: {
    marginTop: 10,
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'OpenSans-Light',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonList: {
    marginTop: 35,
  },
});

export default styles;
