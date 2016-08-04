import React, { Component } from 'react';
import { AppState, View } from 'react-native';
import { connect } from 'react-redux';
import { loadAuth } from '../../modules/Authentication/actions';
import InAppAlert  from '../../components/InAppAlert';

import Routes from './Routes';

@connect(
  state => ({
    auth: state.auth,
    inAppAlert: state.inAppAlert
  }),
)
class App extends Component {

  constructor(props) {
    super(props);
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
    }
  }

  shouldComponentUpdate(nextProps)  {
    return (this.props.auth.get('isLoaded') !== nextProps.auth.get('isLoaded'));
  }

  render() {
    console.log(this.props.auth.toJS())
    if(this.props.auth.get('isLoaded')) {
      const inAppAlert = this.props.inAppAlert;
      return (
        <View>
          <InAppAlert
            show={inAppAlert.get('show')}
            type={inAppAlert.get('type')}
            title={inAppAlert.get('title')}
            text={inAppAlert.get('text')}
            closeInterval={inAppAlert.get('closeInterval')}
          />
          <Routes/>
        </View>
      );
    } else {
      return null;
    }
  }
}

export default App;
