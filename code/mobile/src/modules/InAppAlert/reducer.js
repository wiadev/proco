import { fromJS } from 'immutable';
import _ from 'lodash';

import {
    CREATE_ALERT,
    DELETE_ALERT
} from './actionTypes';

/*
alert props:
    id: string or null
    type: string['danger'|'warning'|'success'|'info']
    duration: int
    title: string
    context: string
*/

export const initialState = fromJS({
    alerts: [
        {
            id: null,
            type: 'danger',
            duration: 4000,
            title: "Test Alert",
            context: "You got test alerted."
        },
        {
            id: null,
            type: 'warning',
            duration: 9000,
            title: "Test Alert",
            context: "You got test alerted."
        },
        {
            id: null,
            type: 'success',
            duration: 4000,
            title: "Test Alert",
            context: "You got test alerted."
        },
        {
            id: null,
            type: 'info',
            duration: 9000,
            title: "Test Alert",
            context: "You got test alerted."
        }
    ]
});

const defaultAlertProps = {
    id: null,
    type: 'info',
    duration: 4000,
    title: "",
    context: ""
};

export default function reducer(state = initialState, action) {
    let alerts = state.toJS().alerts;

    switch (action.type) {
        case CREATE_ALERT:
            alerts.push({
                ...defaultAlertProps,
                ...action.payload
            });

            return state.set('alerts', alerts);
        case DELETE_ALERT:
            if (typeof(action.payload) === 'object') {
                _.remove(alerts, alert => {
                    return _.isEqual(alert, action.payload);
                });
            } else {
                _.remove(alerts, alert => {
                    return alert.id === action.payload;
                });
            }

            return state.set('alerts', fromJS(alerts));
        default:
            return state;
    }
}
