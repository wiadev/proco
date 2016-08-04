import React, { Component } from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import { loadAuth } from '../../modules/Authentication/actions';

import Routes from './Routes';

@connect(
  state => ({ auth: state.auth }),
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
    if(this.props.auth.get('isLoaded')) {
      return (<Routes />);
    } else {
      return null;
    }
  }
}

export default App;
