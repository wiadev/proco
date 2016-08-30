import React, {Component} from 'react';
import {AppState, NetInfo, View, StatusBar, Linking} from 'react-native';
import {connect} from 'react-redux';
import InAppAlert  from './components/InAppAlert';
import {startCheckingAuth,logout} from './modules/Authentication/actions';
import {syncPermissions, updateNotificationToken} from './modules/Permissions/actions';
import {clearInAppAlert,createAlert} from './modules/InAppAlert/actions';
import NoInternetModal from './components/NoInternetModal';
import BlockedUserModal from './components/BlockedUserModal';
import FCM from 'react-native-fcm';

import Routes from './core/Routes';

@connect(
  state => ({
    auth: state.auth,
    user: state.user,
    statusbar: state.statusbar,
    isUser: state.isUser,
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
      this.props.dispatch(startCheckingAuth());
      this.refreshUnsubscribe = FCM.on('refreshToken',
        (fcm_token) => this.props.dispatch(updateNotificationToken(fcm_token)));
      FCM.getFCMToken().then(fcm_token =>
        this.props.dispatch(updateNotificationToken(fcm_token))
      ).catch(() => {
        console.log("get fcm token error")
      })
    }
  }

  render() {
    const {
      dispatch,
      statusbar,
      auth: { uid },
      user: { first_name }, isUser: { blocked, verified },
    } = this.props;
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#7A36AD',
      }}>
        <StatusBar
          showHideTransition="slide"
          {...statusbar}
        />
        <InAppAlert />
        <NoInternetModal />
        <BlockedUserModal
          visible={(blocked === true) || false}
          logout={() => dispatch(logout())}
          contact={() => Linking.openURL("https://procoapp.com/pages/banned-user.html")}
          name={first_name}
        />
        {!(blocked === true) && <Routes uid={uid} isVerified={verified} /> }
      </View>
    );
  }
}

export default App;
