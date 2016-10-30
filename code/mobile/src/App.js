import React, { Component } from "react";
import { AppState, NetInfo, View, StatusBar, Linking } from "react-native";
import startLocationTracking from "./core/location";
import { connect } from "react-redux";
import InAppAlert from "./components/InAppAlert";
import { syncPermissions, updateNotificationToken } from "./modules/Permissions/actions";
import NoInternetModal from "./components/NoInternetModal";
import BlockedUserModal from "./components/BlockedUserModal";
import Loading from "./components/Loading";
import FCM from "react-native-fcm";
import Routes from "./scenes";
import { clearCachedLoops } from "./modules/Profiles/Loops/api";

const logout = () => console.log("logout");

@connect(
  state => ({
    isAuthLoaded: state.auth.get('loaded'),
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
    FCM.getFCMToken().then(fcm_token =>
      this.props.dispatch(updateNotificationToken(fcm_token))
    );

    this.refreshUnsubscribe = FCM.on('refreshToken',
      (fcm_token) => this.props.dispatch(updateNotificationToken(fcm_token)));

    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      console.log("notification", notif);
    });

    FCM.subscribeToTopic('/topics/generic');

    this._locationTracking(this.props);
    clearCachedLoops();
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
    //this.props.dispatch(syncPermissions());
    if (appState == 'active') {
      this.setState({isActive: true});
    } else {
      this.setState({isActive: false});
    }
  }

  componentWillReceiveProps(props) {
    this._locationTracking(props);
  }

  _locationTracking({locationPermission} = this.props) {
    if (locationPermission === 'authorized' && !this.state.didStartedLocationTracking) {
      startLocationTracking();
      this.setState({didStartedLocationTracking: true});
    }
  }

  render() {
    const {
      isAuthLoaded,
    } = this.props;

    return (
      <View style={{
        flex: 1,
        backgroundColor: '#7A36AD',
      }}>
        <NoInternetModal />
        {isAuthLoaded ? <Routes /> : <Loading />}
      </View>
    );
  }
}

export default App;
