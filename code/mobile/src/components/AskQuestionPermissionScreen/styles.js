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
  permissionArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionImage: {
    marginBottom: 25,
  },
  permissionText: {
    marginTop: 10,
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Montserrat-Light',
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 20,
    width: 230,
    marginTop: 40,
  },
  buttonText: {
    color: 'rgb(249,54,95)',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});


export default styles;