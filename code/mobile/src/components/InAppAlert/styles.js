import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // main
  inAppAlerts: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  // Alert
  alert: {
    padding: 10
  },
  alertDanger: {
    backgroundColor: '#EA5644'
  },
  alertWarning: {
    backgroundColor: '#F5A611'
  },
  alertSuccess: {
    backgroundColor: '#19C4A6'
  },
  alertInfo: {
    backgroundColor: '#3BA2E0'
  },
  alertText: {
    color: '#FFFFFF'
  },
  alertTitle: {
    fontSize: 16,
    marginBottom: 6
  }
});

export default styles;
