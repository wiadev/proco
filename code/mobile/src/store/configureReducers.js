/* @flow */

import { combineReducers } from 'redux';

import inAppAlertReducer from '../modules/InAppAlert/reducer';
import authReducer from '../modules/Authentication/reducer';
import permissionsReducer from '../modules/Permissions/reducer';
import statusBarReducer from '../modules/StatusBar/reducer';
import poolReducer from '../modules/Pool/reducer';
import firebaseReducer from '../core/Api/firebase/reducer';

const reducers = {
  inAppAlerts: inAppAlertReducer,
  auth: authReducer,
  permissions: permissionsReducer,
  statusbar: statusBarReducer,
  api: firebaseReducer,
  pool: poolReducer,
};

const namespacedReducer = combineReducers(
	reducers,
);

export default function mainReducer(state, action) {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return namespacedReducer(state || void 0, action);
}
