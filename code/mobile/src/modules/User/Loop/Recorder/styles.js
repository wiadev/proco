import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'transparent'
  },
  containerWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  container: {
    flex: 1
  }
});

export default styles;
