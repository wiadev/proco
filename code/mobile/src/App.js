import React, {Component} from 'react';
import {AppState, NetInfo, View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import InAppAlert  from './components/InAppAlert';
import {loadAuth} from './modules/Authentication/actions';
import {syncPermissions, updateNotificationToken} from './modules/Permissions/actions';
import {clearInAppAlert,createAlert} from './modules/InAppAlert/actions';
import NoInternetModal from './components/NoInternetModal';
import FCM from 'react-native-fcm';

import Routes from './core/Routes';

@connect(
  state => ({
    auth: state.auth,
    statusbar: state.statusbar,
  }),
)
class App extends Component {

  constructor(props) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.handleAppStateChange('active'); // First time
    FCM.subscribeToTopic('/topics/generic');
    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      console.log(notif);
      this.props.dispatch(createAlert({
        type: 'info',
        title: notif.notification.title
      }));
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    });

  }

  componentWillUnmount() {
    AppState.removeEventListener(
      'change',
      this.handleAppStateChange
    );
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }

  handleAppStateChange(appState) {
    this.props.dispatch(syncPermissions());
    if (appState == 'active') {
      this.props.dispatch(loadAuth());
      this.refreshUnsubscribe = FCM.on('refreshToken',
        (fcm_token) => this.props.dispatch(updateNotificationToken(fcm_token)));
      FCM.getFCMToken().then(fcm_token => this.props.dispatch(updateNotificationToken(fcm_token)));
    }
  }

  render() {
    return (
      <View>
        <StatusBar
          showHideTransition="slide"
          {...this.props.statusbar}
        />
        <InAppAlert />
        <NoInternetModal />
        <Routes />
      </View>
    );
  }
}

export default App;
