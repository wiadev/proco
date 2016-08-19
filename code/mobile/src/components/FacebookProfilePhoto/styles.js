import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  avatar: {
    left: width / 2 - 80,
    height: 160,
    width: 160,
    margin: 0,
    position: 'absolute',
    top: height * 0.175,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 160,
    height: 160,
    margin: 0,
  },
});


export default styles;
