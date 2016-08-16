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
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    height: 75,
    width,
    backgroundColor: 'transparent',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomMenuLeft: {
    flex: 1,
    width: width * 25 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  bottomMenuRight: {
    flex: 1,
    width: width * 25 / 100,
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  bottomMenuRightBtn: {
    height: 46,
    width: 46,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 23,
    backgroundColor: 'rgb(249, 54, 95)',
    overflow: 'hidden',
  },
  bottomMenuMid: {
    flex: 2,
    width: width * 50 / 100,
    position: 'relative',
    alignItems: 'center',
  },
});

export default styles;
