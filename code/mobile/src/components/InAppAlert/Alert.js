import React from 'react';
import {
    View,
    Text,
    Animated,
    Easing
} from 'react-native';

import styles from './styles';

export default class Alert extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        let alertDisplayTime = new Animated.Value(1);

        alertDisplayTime.addListener(newAlertDisplayTime => {
            if (newAlertDisplayTime.value === 0) {
                this.props.onComplete();
            }
        });

        Animated.timing(alertDisplayTime, {
            toValue: 0,
            duration: this.props.alert.duration
        }).start();
    }

    render() {
        return (
            <View style={this._getAlertStyle(this.props.alert)}>
                <Text style={[styles.alertText, styles.alertTitle]}>{this.props.alert.title}</Text>

                <Text style={styles.alertText}>{this.props.alert.context}</Text>
            </View>
        );
    }

    _getAlertStyle(alert) {
        let alertStyle = [styles.alert];

        switch (alert.type) {
            case 'danger':
                alertStyle.push(styles.alertDanger);
                break;
            case 'warning':
                alertStyle.push(styles.alertWarning);
                break;
            case 'success':
                alertStyle.push(styles.alertSuccess);
                break;
            default:
                alertStyle.push(styles.alertInfo)
        }

        return alertStyle;
    }
}

Alert.propTypes = {
    alert: React.PropTypes.any.isRequired,
    onComplete: React.PropTypes.func.isRequired
};