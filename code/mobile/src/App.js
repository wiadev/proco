import React, { Component } from 'react';
import { AppState, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import InAppAlert  from './components/InAppAlert';
import { loadAuth } from './modules/Authentication/actions';
import { syncPermissions } from './modules/Permissions/actions';
import { clearInAppAlert } from './modules/InAppAlert/actions';

import Routes from './core/Routes';

@connect(
  state => ({
    auth: state.auth,
    inAppAlerts: state.inAppAlerts,
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
        this.handleAppStateChange('active');
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(appState) {
        if (appState == 'active') {
            console.log("active")
            this.props.dispatch(loadAuth());
        }
    }

    shouldComponentUpdate(nextProps)  {
        return (this.props.auth.get('isLoaded') !== nextProps.auth.get('isLoaded'));
    }

  handleAppStateChange(appState) {
    if (appState == 'active') {
      this.props.dispatch(loadAuth());
      this.props.dispatch(syncPermissions());
    }
  }

  shouldComponentUpdate(nextProps)  {
    return (this.props.auth.get('isLoaded') !== nextProps.auth.get('isLoaded'));
  }

  render() {
    const inAppAlert = this.props.inAppAlert;
    return (
      <View>
        <StatusBar
          showHideTransition="slide"
          {...this.props.statusbar}
        />
        <InAppAlert />
        <Routes />
      </View>
    );
  }
}

export default App;
