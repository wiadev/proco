import {
  StyleSheet,
  Dimensions
} from 'react-native';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  profileLoop: {
    position: 'relative',
    flex: 1
  },
  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: screen.width,
    height: screen.height * 5
  },
  container: {
    flex: 1
  }
});

export default styles;
