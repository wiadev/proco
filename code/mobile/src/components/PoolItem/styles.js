import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  poolItem: {
    width,
    height,
  },
  poolItemContent: {
    flex: 0,
    justifyContent: 'flex-end',
    padding: 10
  },
  actionButtonContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  nonTopBubble: {
    marginTop: 10
  }
});

export default styles;
