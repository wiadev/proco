import React from 'react';
import { connect } from 'react-redux';
import {
    View
} from 'react-native';

import Alert from './Alert';
import { deleteAlert } from '../../modules/InAppAlert/actions';
import styles from './styles';

@connect(state => ({alerts: state.inAppAlerts.alerts}))
export default class InAppAlert extends React.Component {
    render() {
        return (
            <View style={styles.inAppAlerts}>
              {this._renderAlerts()}
            </View>
        );
    }

    _renderAlerts() {
      if (this.props.alerts.length > 0) {
        return this.props.alerts.map((alert, key) => {
          return (
            <Alert key={key} alert={alert} onComplete={completedAlert => this._onAlertComplete(completedAlert)} />
          );
        });
      }
    }

    _onAlertComplete(alert) {
        this.props.dispatch(deleteAlert(alert));
    }
}
