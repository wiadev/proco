import React, { Component } from 'react';
import { AppState, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { loadAuth } from './modules/Authentication/actions';
import { syncPermissions } from './modules/Permissions/actions';
import { clearInAppAlert } from './modules/InAppAlert/actions';
import InAppAlert  from './components/InAppAlert';

import Routes from './core/Routes';

@connect(
  state => ({
    auth: state.auth,
    inAppAlert: state.inAppAlert,
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
        <InAppAlert
          show={inAppAlert.get('show')}
          title={inAppAlert.get('title')}
          text={inAppAlert.get('text')}
          clear={() => this.props.dispatch(clearInAppAlert())}
        />
        <StatusBar
          barStyle="light-content"
        />
        <Routes />
      </View>
    );
  }
}

export default App;
