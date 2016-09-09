import React, {Component} from "react";
import {AppState, NetInfo, View, StatusBar, Linking} from "react-native";
import startLocationTracking from "./modules/Location";
import {connect} from "react-redux";
import InAppAlert from "./components/InAppAlert";
import {AuthListener, logout} from "./modules/Authentication";
import {syncPermissions, updateNotificationToken} from "./modules/Permissions/actions";
import {createAlert} from "./modules/InAppAlert/actions";
import NoInternetModal from "./components/NoInternetModal";
import BlockedUserModal from "./components/BlockedUserModal";
import FCM from "react-native-fcm";
import Routes from "./core/Routes";

@connect(
  state => ({
    auth: state.auth,
    statusbar: state.statusbar,
    permissions: state.permissions,
    blocked: state.api.data.userIs.blocked,
    first_name: state.api.data.userInfo.first_name,
  }),
)
class App extends Component {

  constructor(props) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this._locationTracking = this._locationTracking.bind(this);
    this.state = {
      didStartedLocationTracking: false,
      isActive: false,
    }
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

    this._locationTracking(this.props);
    console.log(this.props, this.state);


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
      this.setState({isActive: true});
      this.refreshUnsubscribe = FCM.on('refreshToken',
        (fcm_token) => this.props.dispatch(updateNotificationToken(fcm_token)));
      FCM.getFCMToken().then(fcm_token =>
        this.props.dispatch(updateNotificationToken(fcm_token))
      ).catch(() => {
        console.log("get fcm token error")
      })
    } else {
      this.setState({isActive: false});
    }
  }

  componentWillReceiveProps(props) {
    this._locationTracking(props);
  }

  _locationTracking({ permissions: { location } } = this.props) {
    if (location === 'authorized' && !this.state.didStartedLocationTracking) {
      startLocationTracking();
      this.setState({didStartedLocationTracking: true});
    }
  }

  render() {
    const {
      dispatch,
      auth: {uid, isLoaded},
      first_name,
      blocked,
    } = this.props;

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
        <AuthListener uid={uid}/>
        {(uid && blocked) && <BlockedUserModal
          blocked={blocked}
          logout={() => dispatch(logout())}
          contact={() => Linking.openURL("https://procoapp.com/pages/banned-user.html")}
          name={first_name}
        />}
        <Routes />
      </View>
    );
  }
}

export default App;
