import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  header: {
    flex: 0,
    height: 50,
    position: 'relative',
    width,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    top: 20,
  },
  headerLeft: {
    flex: 1,
    width: width * 25 / 100,
    position: 'relative',
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: 'transparent',
  },
  headerMid: {
    flex: 2,
    width: width * 50 / 100,
    position: 'relative',
  },
  headerRight: {
    flex: 1,
    width: width * 25 / 100,
    alignItems: 'flex-end',
    paddingRight: 10,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    flex: 0,
    alignSelf: 'center',
    height: 40
  },
});

export default styles;
