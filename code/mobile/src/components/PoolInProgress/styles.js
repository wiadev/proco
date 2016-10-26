import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../core/style/colors';

const screen = Dimensions.get('window');

const videoSize = screen.width / 5 * 4;

const styles = StyleSheet.create({
  poolInProgress: {
    flex: 1,
    backgroundColor: colors.primary1
  },
  beforeVideo: {
    flex: 1,
    flexDirection: 'row'
  },
  beforeVideoContentSideCushion: {
    flex: 1
  },
  beforeVideoContent: {
    flex: 8,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.primary2,
    textAlign: 'center'
  },
  description: {
    marginTop: 10,
    color: colors.primaryAlt,
    textAlign: 'center'
  },
  video: {
    alignSelf: 'center',
    width: videoSize,
    height: videoSize
  },
  afterVideo: {
    flex: 1,
    flexDirection: 'row'
  },
  logoSideCushion: {
    flex: 1
  },
  logoContainer: {
    flex: 1
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  }
});

export default styles;
