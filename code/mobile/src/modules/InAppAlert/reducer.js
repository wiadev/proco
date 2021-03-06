import _ from 'lodash';
import { assign } from '../../core/utils';

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

export const initialState = {
    alerts: [
    ]
};

const defaultAlertProps = {
    id: null,
    type: 'info',
    duration: 0,
    title: "",
    context: ""
};

export default function reducer(state = initialState, action) {
    let alerts = state.alerts;

    switch (action.type) {
        case CREATE_ALERT:
            const newAlert = {
                ...defaultAlertProps,
                ...action.payload
            };

            if (newAlert.duration === 0 && newAlert.id === null) {
                throw `You need to set at least one of duration or id properties for an alert.`;
            }

            alerts.push(newAlert);

            return assign(state, {
              alerts
            });
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

          return assign(state, {
            alerts
          });
        default:
            return state;
    }
}
