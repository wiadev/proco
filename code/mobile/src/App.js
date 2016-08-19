import React, {Component} from 'react';
import {AppState, NetInfo, View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import InAppAlert  from './components/InAppAlert';
import {loadAuth} from './modules/Authentication/actions';
import {syncPermissions} from './modules/Permissions/actions';
import {clearInAppAlert} from './modules/InAppAlert/actions';
import NoInternetModal from './components/NoInternetModal';

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
  }

  componentWillUnmount() {
    AppState.removeEventListener(
      'change',
      this.handleAppStateChange
    );
  }

  handleAppStateChange(appState) {
    this.props.dispatch(syncPermissions());
    if (appState == 'active') {
      this.props.dispatch(loadAuth());
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
