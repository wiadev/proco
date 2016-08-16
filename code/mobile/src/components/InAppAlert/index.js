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
        const alerts = this.props.inAppAlerts.get('alerts').toJS();
        const hasAlert = alerts.length > 0;

        return (
            <View>
                <StatusBar hidden={hasAlert} />

                {hasAlert ? alerts.map((alert, key) => {
                    return (
                        <Alert key={key} alert={alert} onComplete={() => this._onAlertComplete(alert)} />
                    );
        }) : null}
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
