import {StyleSheet} from 'react-native';

import colors from '../../../core/style/colors';

const styles = StyleSheet.create({
  messageCountIcon: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    backgroundColor: 'transparent',
    color: colors.primaryAlt,
    fontSize: 32
  },
  iconContentWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 32
  },
  iconContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  messagesCount: {
    fontSize: 14,
    backgroundColor: 'transparent',
    color: colors.primary1
  },
  unreadIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: colors.primaryAlt
  },
  unreadIndicatorInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary1
  },
  avatars: {
    marginRight: 5
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10
  }
});

export default styles;
