import React, { Component } from 'react';
import { AppState, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { loadAuth } from '../../modules/Authentication/actions';
import InAppAlert  from '../../components/InAppAlert';

import Routes from './Routes';

@connect(
    state => ({
        auth: state.auth,
        inAppAlerts: state.inAppAlerts
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

    render() {
        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                />
                <Routes/>

                <InAppAlert />
            </View>
        );
    }
}

export default App;
