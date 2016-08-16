import React from 'react';
import { connect } from 'react-redux';
import {
    View,
    StatusBar
} from 'react-native';

import Alert from './Alert';
import { deleteAlert } from '../../modules/InAppAlert/actions';

class InAppAlert extends React.Component {
    render() {
        const hideStatusBar = this.props.inAppAlerts.get('alerts').length > 0;

        console.log(this.props.inAppAlerts.toJS());

        return (
            <View>
                <StatusBar hidden={hideStatusBar} />

                {this.props.inAppAlerts.get('alerts').map((alert, key) => {
                    return (
                        <Alert key={key} alert={alert} onComplete={() => this._onAlertComplete(alert)} />
                    );
                })}
            </View>
        );
    }

    _onAlertComplete(alert) {
        this.props.dispatch(deleteAlert(alert));
    }
}

export default connect(state => {
    return {
        inAppAlerts: state.inAppAlerts
    };
})(InAppAlert);
