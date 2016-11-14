import _ from 'lodash';
import { assign } from '../../core/utils';

import {
  CREATE_ALERT,
  DELETE_ALERT,
} from './actions';

/*
 alert props:
 id: string or null
 type: string['danger'|'warning'|'success'|'info']
 duration: int
 title: string
 context: string,
 onPress: function
 */

export const initialState = {
  alerts: [
    /*{
      duration: 3000,
      type: 'danger',
      title: "Danger",
      context: "This is a danger type alert.",
      onPress: () => console.log("onPress"),
    },
    {
      duration: 4000,
      type: 'warning',
      title: "Warning",
      context: "This is a warning type alert.",
      onPress: () => console.log("onPress"),
    },
    {
      duration: 5000,
      type: 'success',
      title: "Success",
      context: "This is a success type alert.",
      onPress: () => console.log("onPress"),
    },
    {
      duration: 6000,
      type: 'info',
      title: "Info",
      context: "This is a info type alert.",
      onPress: () => console.log("onPress"),
    }*/
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
