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

        this.state = {
            alert: null,
            displayTime: new Animated.Value(1),
            opacity: new Animated.Value(1)
        };
    }

    componentDidMount() {
        // BEWARE! Animated somehow sends wrong this.props.alert when animation is complete.
        // So, we store initial alert data (this one is correct alert data) on state to pass parent when animation is complete.
        this.setState({
            alert: this.props.alert
        });

        if (this.props.alert.duration > 0) {
            Animated.timing(this.state.displayTime, {
                toValue: 0,
                duration: this.props.alert.duration
            }).start(() => {
                this.props.onComplete(this.state.alert);
            });
        }
    }

    render() {
        return (
            <Animated.View style={[this._getAlertStyle(this.props.alert), {opacity: this.state.opacity}]}>
                <Text style={[styles.alertText, styles.alertTitle]}>{this.props.alert.title}</Text>

                <Text style={styles.alertText}>{this.props.alert.context}</Text>
            </Animated.View>
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