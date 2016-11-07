import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  poolItem: {
    width: Dimensions.get('window').width
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
