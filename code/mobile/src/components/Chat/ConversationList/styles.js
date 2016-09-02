import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  conversationList: {
    flex: 1
  },
  conversation: {
    flexDirection: 'row',
    paddingVertical: 4
  },
  avatar: {
    flex: 1
  },
  conversationInfo: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  username: {
    fontSize: 18
  },
  lastMessage: {
    fontSize: 12,
    opacity: 0.7
  }
});

export default styles;
