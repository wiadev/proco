import React, {Component} from "react";
import {AppState, NetInfo, View, StatusBar, Linking} from "react-native";
import {connect} from "react-redux";
import InAppAlert from "./components/InAppAlert";
import {AuthListener, logout} from "./modules/Authentication";
import {UserListener} from "./modules/User";
import BackgroundLocationTracker from "./modules/Location/tracker";
import {syncPermissions, updateNotificationToken} from "./modules/Permissions/actions";
import {createAlert} from "./modules/InAppAlert/actions";
import NoInternetModal from "./components/NoInternetModal";
import BlockedUserModal from "./components/BlockedUserModal";
import BlockerActivity from "./components/BlockerActivity";
import FCM from "react-native-fcm";
import Routes from "./core/Routes";

@connect(
  state => ({
    auth: state.auth,
    user: state.user,
    statusbar: state.statusbar,
    isUser: state.isUser,
    permissions: state.permissions,
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
      auth: {uid, isLoaded},
      user: {first_name}, isUser: {blocked, onboarded},
      permissions: { location }
    } = this.props;

    const isBlocked = !(blocked === false || blocked === null);

    return (
      <View style={{
        flex: 1,
        backgroundColor: '#7A36AD',
      }}>
        {/*<StatusBar
          showHideTransition="slide"
          {...statusbar}
        />*/}
        <InAppAlert />
        <NoInternetModal />
        <AuthListener uid={uid} />
        {uid && <UserListener type="info" uid={uid}/>}
        {uid && <UserListener type="is" uid={uid}/>}
        {(uid && location === 'authorized') && <BackgroundLocationTracker uid={uid}/>}
        {(uid && isBlocked) && <BlockedUserModal
          blocked={blocked}
          logout={() => dispatch(logout())}
          contact={() => Linking.openURL("https://procoapp.com/pages/banned-user.html")}
          name={first_name}
        />}
        {!isLoaded && <BlockerActivity />}
        {(isLoaded && !isBlocked) && <Routes uid={uid} isOnboarded={onboarded} /> }
      </View>
    );
  }
}

export default App;
