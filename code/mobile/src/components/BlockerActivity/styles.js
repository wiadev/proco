import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
});

export default styles;
