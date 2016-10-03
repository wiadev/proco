import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  conversationList: {
    flex: 1
  },
  conversation: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.06)'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 12
  },
  nameAndLastMessage: {
    flex: 1
  },
  conversationInfo: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  username: {
    fontSize: 18,
    fontWeight: '600'
  },
  lastMessage: {
    fontSize: 12,
    opacity: 0.7
  },
  timeSince: {
    opacity: 0.7
  }
});

export default styles;
