import React from 'react';
import { connect } from 'react-redux';
import {
    View
} from 'react-native';

import Alert from './Alert';
import { deleteAlert } from '../../modules/InAppAlert/actions';

@connect(state => ({inAppAlerts: state.inAppAlerts}))
export default class InAppAlert extends React.Component {
    render() {
        const alerts = this.props.inAppAlerts.alerts;
        const hasAlert = alerts.length > 0;

        return (
            <View>
                {hasAlert ? alerts.map((alert, key) => {
                    return (
                        <Alert key={key} alert={alert} onComplete={completedAlert => this._onAlertComplete(completedAlert)} />
                    );
                }) : null}
            </View>
        );
    }

    _onAlertComplete(alert) {
        this.props.dispatch(deleteAlert(alert));
    }
}
