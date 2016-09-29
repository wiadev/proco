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
import Loading from './components/Loading';
import FCM from "react-native-fcm";
import Routes from "./scenes";
import {clearCachedLoops} from "./modules/Profiles/Loops/api";

@connect(
  state => ({
    auth: state.auth,
    permissions: state.permissions,
    banned: state.api.data.userIs.banned,
    first_name: state.api.data.userInfo.first_name,
    uid: state.auth.uid,
    isLoadedAuth: state.auth.isLoaded,
    isLoadedIs: state.api.data.userIs.isLoaded,
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
    FCM.subscribeToTopic('/topics/my');

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
    this.props.dispatch(syncPermissions());
    if (appState == 'active') {
      this.setState({isActive: true});
    } else {
      this.setState({isActive: false});
    }
  }

  componentWillReceiveProps(props) {
    this._locationTracking(props);
  }

  _locationTracking({permissions: {location}} = this.props) {
    if (location === 'authorized' && !this.state.didStartedLocationTracking) {
      startLocationTracking();
      this.setState({didStartedLocationTracking: true});
    }
  }

  _shouldRouterRender({isLoadedAuth} = this.props) {
    return !!(isLoadedAuth);
  }

  render() {
    const {
      dispatch,
      auth: {uid, isLoaded},
      first_name,
      banned,
    } = this.props;

    return (
      <View style={{
        flex: 1,
        backgroundColor: '#7A36AD',
      }}>
        {/*<StatusBar
         showHideTransition="slide"
         />*/}
        <InAppAlert />
        <NoInternetModal />
        <AuthListener uid={uid}/>
        {(uid && banned) && <BlockedUserModal
          banned={banned}
          logout={() => dispatch(logout())}
          contact={() => Linking.openURL("https://procoapp.com/pages/banned-user.html")}
          name={first_name}
        />}
        {this._shouldRouterRender() ? <Routes /> : <Loading />}
      </View>
    );
  }
}

export default App;
